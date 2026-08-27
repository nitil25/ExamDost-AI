// import dotenv from "dotenv";
// dotenv.config();
// import Stripe from "stripe";
// import { userModel } from "../models/user.model.js";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// const CREDITS_MAP = {
//   100: 250,
//   200: 500,
//   500: 1000,
// };

// export const createCreditsOrder = async (req, res) => {
//   try {
//     const userId = req.userId;
//     const { amount } = req.body;

//     if (!CREDITS_MAP[amount]) {
//       return res.status(400).json({
//         message: "Invalid amount",
//       });
//     }

//     const session = await stripe.checkout.sessions.create({
//       mode: "payment",
//       payment_method_types: ["card"],
//       success_url: `${process.env.CLIENT_URL}/payment-success`,
//       cancel_url: `${process.env.CLIENT_URL}/payment-failed`,
//       line_items: [
//         {
//           price_data: {
//             currency: "inr",
//             product_data: {
//               name: `${CREDITS_MAP[amount]} Credits`,
//             },
//             unit_amount: amount * 100,
//           },
//           quantity: 1,
//         },
//       ],
//       metadata: {
//         userId,
//         credits: CREDITS_MAP[amount],
//       },
//     });

//     return res.status(200).json({
//       url: session.url,
//     });
//   } catch (error) {
//     return res.status(400).json({
//       message: `Payment gateway error : ${error.message}`,
//     });
//   }
// };


// export const stripeWebhook = async (req, res) => {
//   const sign = req.headers["stripe-signature"];
//   let event;
//   try {
//     event = stripe.webhooks.constructEvent(
//       req.body,
//       sign,
//       process.env.STRIPE_WEBHOOK_SECRET,
//     );
//   } catch (error) {
//     return res.status(400).json({
//       message: `Stripe webhook error : ${error.message}`,
//     });
//   }

//   if (event.type === "checkout.session.completed") {
//     const session = event.data.object;

//     const userId = session.metadata.userId;
//     const creditsToAdd = Number(session.metadata.credits);

//     if (!userId || !creditsToAdd) {
//       return res.status(400).json({
//         message: "Invalid metadata",
//       });
//     }

//     const user = await userModel.findByIdAndUpdate(
//       userId,
//       {
//         $inc: { credits: creditsToAdd },
//         $set: { isCreditAvailable: true },
//       },
//       { new: true },
//     );

//     return res.status(200).json({
//       recieved: true,
//     });
//   }
// };




import dotenv from "dotenv";
dotenv.config();
import Stripe from "stripe";
import { userModel } from "../models/user.model.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const CREDITS_MAP = {
  100: 250,
  200: 500,
  500: 1000,
};

export const createCreditsOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const { amount } = req.body;

    if (!CREDITS_MAP[amount]) {
      return res.status(400).json({
        message: "Invalid amount",
      });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/payment-failed`,
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: `${CREDITS_MAP[amount]} Credits`,
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId,
        credits: CREDITS_MAP[amount],
      },
    });

    return res.status(200).json({
      url: session.url,
    });
  } catch (error) {
    return res.status(400).json({
      message: `Payment gateway error : ${error.message}`,
    });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { session_id } = req.query;

    if (!session_id) {
      return res.status(400).json({
        message: "Missing session_id",
      });
    }

    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status !== "paid") {
      return res.status(400).json({
        message: "Payment not completed",
      });
    }

    const userId = session.metadata?.userId;
    const credits = Number(session.metadata?.credits);

    if (!userId || !credits) {
      return res.status(400).json({
        message: "Missing metadata on session",
      });
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { $inc: { credits: credits } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "Credits added successfully",
      credits: updatedUser.credits,
    });
  } catch (error) {
    return res.status(400).json({
      message: `Verification error: ${error.message}`,
    });
  }
};