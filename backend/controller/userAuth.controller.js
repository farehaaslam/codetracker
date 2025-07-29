import {genratejwt} from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt"


export const userSignup = async (req, res) => {
    const { username, email, password } = req.body;
    if(!email || !username || !password){
        return res.status(400).json({
            message:"all field are required"
        })
    }
    if(password.length<6){
        return res.status(400).json({
            message:"password must be 6 character "
        })
    }
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });
        if(newUser){
            genratejwt(newUser)
            await newUser.save();
            console.log("User created successfully");
            return res.status(201).json({
                message: "User created successfully",
                user: {
                    id: newUser._id,
                    username: newUser.username,
                    email: newUser.email    
                }
            });

        }
          else{
        res.status(400).json({
            message:"invalid user data"
        })

    }
    } catch (error) {
           console.log( "error in signup function",error.message)
        res.status(500).json({
            message:"internal server error"
        })
        
    }
}
export const userSignin= async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password){
        return res.status(400).json({
            message:"all field are required"
        })
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid password"
            });
        }
        const token=genratejwt(user._id);
         res.cookie("jwt",token,{
            maxAge:2*24*60*60*1000,
            httpOnly:true,
            sameSite:"strict",
            secure:process.env.NODE_ENV !=="development"

        })
        console.log("user signed in successfully");
         // Set the cookie with the JWT token
        return res.status(200).json({
            message: "User signed in successfully",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        }); 
    } catch (error) {
        console.log("error in signin function", error.message);
        res.status(500).json({
            message: "internal server error"
        });
    }
}
export const userlogout=async (req,res) => {
    try {
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({
            message:"log out succesfully"
        })
    } catch (error) {
        console.log("error in logout controller");
        res.status(500).json({
            message:"internal server error"
        }) 
    }
    
}
export const check=(req,res)=>{
    try {
        res.status(200).json(req.user);
        
    } catch (error) {
        console.log("error in auth controller ",error.message);
        res.status(500).json({
            message:"internal sever error"
        })
        
    }
}
//update target 
