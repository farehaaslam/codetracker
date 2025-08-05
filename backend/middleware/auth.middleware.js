import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    // Check for token in Authorization header (for extension) or cookies (for web app)
    let token
    if (  req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1]; // Extract Bearer token
    }

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    // Verify token using access token secret
    
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: "Token expired - please refresh" });
      }
      if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
      }
      throw err; // Other errors
    }

    // Log for debugging (remove in production)
    console.log(decoded);

    // Find user by _id (matches your token payload)
    const user = await User.findById(decoded._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Log for debugging (remove in production)
    console.log(user);

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectRoute middleware:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
