import express from "express"
import isAuth from "../middlewares/isAuth.js"
import { getCurrentUser } from "../controller/user.controller.js"

const userRouter = express.Router()

userRouter.get("/currentuser",isAuth,getCurrentUser)

export default userRouter