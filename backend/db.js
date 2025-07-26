import mongoose from "mongoose"
import express from "express"

const connectDB = async (url) => {
    try {
        await mongoose.connect(url)
        console.log("MongoDB connected successfully")
    } catch (error) {
        console.error("MongoDB connection failed:", error.message)
        process.exit(1) // Exit the process with failure
    }
}
const startserver = async (app, PORT) => {
    try {
        await connectDB(process.env.MONGODB_URI)
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    }
    catch (error) {
        console.error("Error starting server:", error.message)
        process.exit(1) // Exit the process with failure
    }
}
export default startserver;