import express  from "express"
import cors from "cors"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import 'dotenv/config'
import startserver from "./db.js"   
import userRouter from "./routes/user.routes.js";
const PORT = process.env.PORT || 5000;  
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true , limit: '10mb' }));

app.use(cookieParser());
app.use("/api/user", userRouter);
startserver(app, PORT);