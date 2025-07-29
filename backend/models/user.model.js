import mongoose from "mongoose";
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
const User = mongoose.model('User', userSchema)
export default User;