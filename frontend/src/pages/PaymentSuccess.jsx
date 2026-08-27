// import { scale, motion } from 'motion/react'
// import React, { useEffect } from 'react'
// import { IoMdCheckmarkCircleOutline } from "react-icons/io";
// import { getCurrentuser } from '../services/api';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

// const PaymentSuccess = () => {

//     const dispatch = useDispatch()
//     const navigate = useNavigate()

//   useEffect(()=>{
//     getCurrentuser(dispatch)

//     const t = setTimeout(() => {
//         navigate("/")
//     }, 5000);

//     return ()=> clearTimeout(t)

//   },[])

//   return (
//     <div className='min-h-screen flex flex-col p-4 items-center justify-center gap-4 '>
//       <motion.div intial={{scale:0, rotate:-180}} animate={{scale:1, rotate:360}} transition={{duration:0.8,ease:"easeOut"}} className='text-green-500 text-6xl' >
//         <IoMdCheckmarkCircleOutline />
//       </motion.div>

//       <motion.h1 intial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.3}} className='text-2xl font-bold text-green-600' >Payment successfull Credits Added</motion.h1>
//       <motion.p intial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.6}} className='text-gray-500 text-sm' >Redirecting to Home....</motion.p>

//     </div>
//   )
// }

// export default PaymentSuccess




import { scale, motion } from 'motion/react'
import React, { useEffect } from 'react'
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { getCurrentuser, verifyPayment } from '../services/api';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

  useEffect(()=>{
    const sessionId = new URLSearchParams(window.location.search).get("session_id")

    const confirmPayment = async () => {
      if (sessionId) {
        try {
          await verifyPayment(sessionId)
        } catch (error) {
          console.error("Payment verification failed:", error)
        }
      }
      getCurrentuser(dispatch)
    }

    confirmPayment()

    const t = setTimeout(() => {
        navigate("/")
    }, 5000);

    return ()=> clearTimeout(t)

  },[])

  return (
    <div className='min-h-screen flex flex-col p-4 items-center justify-center gap-4 '>
      <motion.div intial={{scale:0, rotate:-180}} animate={{scale:1, rotate:360}} transition={{duration:0.8,ease:"easeOut"}} className='text-green-500 text-6xl' >
        <IoMdCheckmarkCircleOutline />
      </motion.div>

      <motion.h1 intial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.3}} className='text-2xl font-bold text-green-600' >Payment successfull Credits Added</motion.h1>
      <motion.p intial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.6}} className='text-gray-500 text-sm' >Redirecting to Home....</motion.p>

    </div>
  )
}

export default PaymentSuccess
