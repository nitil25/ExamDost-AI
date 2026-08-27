import jwt from "jsonwebtoken"

const isAuth = async(req,res,next) =>{
    // console.log("req cookies : ",req.cookies)
    try {
        const {token} = req.cookies
        // console.log("token : ",token)
        
        if(!token){
            return res.status(400).json({
                message:"Unauthorized access. Please sign in first"
            })
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        if(!decoded){
            return res.status(400).json({
                message:"Unauthorized access."
            })
        }

        req.userId = decoded.userId

        next()


    } catch (error) {
        return res.status(500).json({
            message:`Is auth error :${error}`
        })
    }
}

export default isAuth