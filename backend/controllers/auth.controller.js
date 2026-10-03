import userModel from "../models/user.model.js"
import bcrypt from "bcryptjs"
import { generateVerificationCode } from "../utils/generateVerificationCode.js"
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js"
export const signup = async(req,res)=>{
    const {email,password,name} = req.body

    try {
        if(!email || !password || !name){
            throw new Error("All fields are required")
        }
        const user = await userModel.findOne({email})
        if(user){
            res.status(400).json({message:"User already exsists"})
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const verificationToken = generateVerificationCode()

        const newUser = new userModel({
            email,
            password:hashedPassword,
            name,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 *60 *1000
        })

        await newUser.save()

        // jwt create
        generateTokenAndSetCookie(res,newUser._id)

        res.status(201).json({
            sucess:true,
            message:"user created sucessfully",
            newUser:{
                ...newUser._doc,
                password:undefined
            }
        })

    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

export const signin = async(req,res)=>{
    res.send("Signin page")
}

export const logout = async(req,res)=>{
    res.send("Logout page")
}