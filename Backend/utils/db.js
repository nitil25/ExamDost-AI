import mongoose from "mongoose"

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MONGO DB CONNECTION SUCCESSFULL")
    } catch (error) {
        console.log(`MONGO DB CONNECION ERROR : ${error}`)
    }
}

export default connectDB