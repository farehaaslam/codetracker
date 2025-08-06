import express  from "express"
import cors from "cors"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import 'dotenv/config'
import startserver from "./db.js"   
import userRouter from "./routes/user.routes.js";
import submissionRouter from "./routes/submission.routes.js";
const PORT = process.env.PORT || 5000;  
const app = express();
const allowedOrigins = [
  'http://localhost:5173', // Local Vite dev server
  'https://codetracker-khaki.vercel.app',
 'chrome-extension://incmgcghbgeeinpadijflmfbnjmggpok'
];
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,            
}));
app.use(express.json({  limit: '10mb' }));
app.use(express.urlencoded({ extended: true , limit: '10mb' }));

app.use(cookieParser());
app.use("/api/user", userRouter);
app.use("/api/submission", submissionRouter); 
startserver(app, PORT);