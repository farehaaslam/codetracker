import User from "../models/user.model.js";
import RefreshToken from "../models/RefreshToken.model.js";
import bcrypt from "bcrypt";
import cloudinary from "../lib/cloudinary.js";
import jwt from 'jsonwebtoken';
export const userSignup = async (req, res) => {
  const { username, email, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();

     const accessToken = await newUser.generateAccessToken();
    const refreshToken =await newUser.generateRefreshToken();
    const tokenExpiry = new Date();
    tokenExpiry.setDate(tokenExpiry.getDate() + 30); // Matches '1d' expiry
    await new RefreshToken({
      userId: newUser._id,
      token: refreshToken,
      expiresAt: tokenExpiry,
    }).save();

    return res.status(201).json({
      message: "User created successfully",
      refreshToken,
      accessToken,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Signup Error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const userSignin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "all field are required",
    });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }
    const accessToken = await user.generateAccessToken();
    const refreshToken =await user.generateRefreshToken();
    const tokenExpiry = new Date();
    tokenExpiry.setDate(tokenExpiry.getDate() + 30); // Matches '1d' expiry
    await new RefreshToken({
      userId: user._id,
      token: refreshToken,
      expiresAt: tokenExpiry,
    }).save();
   
    console.log("user signed in successfully");
    return res.status(200).json({
      message: "User signed in successfully",
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("error in signin function", error.message);
    res.status(500).json({
      message: "internal server error",
    });
  }
};
export const userlogout = async (req, res) => {
   try {
    // Assuming refreshToken is sent in body or headers
    console.log(req.body)
    const { refreshToken } = req.body;
    if (refreshToken) {
      await RefreshToken.deleteOne({ token: refreshToken });
    }
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error in logout controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const check = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("error in auth controller ", error.message);
    res.status(500).json({
      message: "internal sever error",
    });
  }
};
export const updateProfile = async (req, res) => {
  try {
    const { profilepic } = req.body;
    const userId = req.user._id;
    if (!profilepic) {
      return res.status(400).json({
        message: "profile pic is required",
      });
    }
    const uploadResponse = await cloudinary.uploader.upload(profilepic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilepic: uploadResponse.secure_url },
      { new: true }
    );
    console.log("Cloudinary upload response:", uploadResponse);
    console.log("updated uuser response :", updatedUser);

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("error in updating profile pic :", error.message);
    res.status(500).json({
      message: "internal sever error",
    });
  }
};

//update target
export const updateTarget = async (req, res) => {
  try {
    const { target } = req.body;
    const userId = req.user._id;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { target },
      { new: true }
    );
    res.status(200).json(updatedUser.target);
  } catch (error) {
    console.log("error in updating target :", error.message);
    res.status(500).json({
      message: "internal sever error",
    });
  }
};
export const getTarget = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    res.status(200).json(user.target);
  } catch (error) {
    console.log("error in getting target :", error.message);
    res.status(500).json({
      message: "internal sever error",
    });
  }
};
export const refreshAccessToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ message: 'Refresh token is required' });
    }

    // Find token in DB
    const storedToken = await RefreshToken.findOne({ token: refreshToken });
    if (!storedToken) {
      return res.status(403).json({ message: 'Refresh token not found' });
    }

    // Check if token is expired
    if (storedToken.expiresAt < new Date()) {
      await RefreshToken.deleteOne({ token: refreshToken }); // Clean up expired token
      return res.status(403).json({ message: 'Refresh token expired' });
    }

    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    // Issue new access token
    const user = await User.findById(decoded._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const newAccessToken = jwt.sign(
      { _id: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' }
    );

    res.status(200).json({ accessToken: newAccessToken });

  } catch (err) {
    console.log("Error in refresh route:", err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
