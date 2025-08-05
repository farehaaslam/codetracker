import mongoose from "mongoose";
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  profilepic:{
    type: String,
    default:"",
  },
  target: {
    type: String,
    default: "3",
  },
},{
    timestamps:true,
});
userSchema.methods.generateAccessToken = function() {
  return jwt.sign(
    { _id: this._id }, 
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '10d' } // Short-lived
  );
};

userSchema.methods.generateRefreshToken = function() {
  return jwt.sign(
    { _id: this._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '30d' } // Long-lived; adjust as needed
  );
};
const User = mongoose.model('User', userSchema)
export default User;