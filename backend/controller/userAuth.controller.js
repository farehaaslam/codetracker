import {genratejwt} from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt"
import cloudinary from "../lib/cloudinary.js";
export const userSignup = async (req, res) => {
  const { username, email, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();

    const token = generateJwt(newUser._id);

    return res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email
      }
    });
  } catch (error) {
    console.error("Signup Error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

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
export const updateProfile=async (req,res) => {
    try {
        const {profilepic}=req.body;
        const userId=req.user._id;
        if(!profilepic){
            return res.status(400).json({
                message:"profile pic is required"
            });
        }
        const uploadResponse=await cloudinary.uploader.upload(profilepic);
        const updatedUser=await User.findByIdAndUpdate(
            userId,
            {profilepic:uploadResponse.secure_url},
            {new:true} 
        )
        console.log("Cloudinary upload response:", uploadResponse);
        console.log("updated uuser response :", updatedUser);


        res.status(200).json(updatedUser)
    } catch (error) {
        console.log("error in updating profile pic :",error.message);
        res.status(500).json({
            message:"internal sever error"
        })
    }
    
}

//update target 
export const updateTarget=async (req,res) => {
    try {
        
        const {target}=req.body;
        const userId=req.user._id;
        const updatedUser=await User.findByIdAndUpdate(userId,{target},{new:true});
        res.status(200).json(updatedUser.target);
    } catch (error) {
        console.log("error in updating target :",error.message);
        res.status(500).json({
            message:"internal sever error"
        })
    }
}
export const getTarget=async (req,res) => {
    try {
        const userId=req.user._id;
        const user=await User.findById(userId);
        res.status(200).json(user.target);
    } catch (error) {
        console.log("error in getting target :",error.message);
        res.status(500).json({
            message:"internal sever error"
        })
    }
}
