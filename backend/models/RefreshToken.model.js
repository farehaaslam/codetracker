import mongoose from "mongoose";
const refreshtoken=new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
          required: true },
   token: { type: String,
        required: true },
  expiresAt: { type: Date, 
    required: true },
  createdAt: { type: Date, 
    default: Date.now }
})
const RefreshToken = mongoose.model('RefreshToken', refreshtoken);
export default RefreshToken;