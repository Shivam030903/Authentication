import mongoose, { mongo } from "mongoose";

const connectToDb = async(req,res)=>{
    try {
        await mongoose.connect(process.env.MOBGO_DB_URI)
        console.log("Connected to db");
        
    } catch (error) {
        console.log("Trouble connection", error.message);
        
    }
}

export default connectToDb