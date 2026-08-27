import express from 'express'
import isAuth from '../middlewares/isAuth.js'
import { createCreditsOrder, verifyPayment } from '../controller/credits.controller.js'

const creditRouter = express.Router()

creditRouter.post("/order",isAuth,createCreditsOrder)
creditRouter.get("/verify-payment",isAuth,verifyPayment)

export default creditRouter