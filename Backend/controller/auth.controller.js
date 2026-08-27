import { userModel } from "../models/user.model.js"
import { getToken } from "../utils/token.js"

// google authentication using firebase
export const googleAuth = async(req,res) =>{
    try {
        const {name, email} = req.body
        let user = await userModel.findOne({email})

        if(!user){
            user = await userModel.create({
                name,email
            })
        }
        

        const token = getToken(user._id)

        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            sameSite:"lax",
            maxAge:7*24*60*60*1000
        })

        return res.status(200).json(user)

    } catch (error) {
        return res.status(500).json({
            message:`Google auth controller error : ${error}`
        })
    }
}

// logout controller
export const logout = async(req,res) => {
    try {
        await res.clearCookie("token")
        return res.status(200).json({
            message:"Logout successfully"
        })
    } catch (error) {
        return res.status(500).json({
            message:`Logout error : ${error}`
        })
    }
}