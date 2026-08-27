import dotenv from "dotenv"
dotenv.config()
import express from "express"
import connectDB from "./utils/db.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import authRouter from "./routes/auth.routes.js"
import userRouter from "./routes/user.routes.js"
import notesRouter from "./routes/generate.routes.js"
import pdfRouter from "./routes/pdf.routes.js"
import creditRouter from "./routes/credits.routes.js"
// import { stripeWebhook } from "./controller/credits.controller.js"

const app = express()
const port = process.env.PORT || 8000

const corsOption = {
    origin:"http://localhost:5173",
    credentials:true
}


// stripe webhook route
// app.post("/api/credit/webhook",express.raw({type:"application/json"}), stripeWebhook)


// All the middlewares
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(cors(corsOption))


// All the apis
app.use("/api/auth", authRouter)
app.use('/api/user',userRouter)
app.use('/api/notes',notesRouter)
app.use('/api/pdf',pdfRouter)
app.use('/api/credit',creditRouter)



// database calling and sever listening
app.listen(port,()=>{
    connectDB()
    console.log(`LORD COMMMANDER SERVER IS RUNNING ON PORT:${port}`)
})