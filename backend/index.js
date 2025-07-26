import express  from "express"
import cors from "cors"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import 'dotenv/config'
import startserver from "./db.js"   
const PORT = process.env.PORT || 5000;  
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.get("/", (req, res) => {
    res.send("Welcome to the Code Tracker API");
});
startserver(app, PORT);