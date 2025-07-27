import Submission from "../models/submission.model";
import { genratejwt } from "../lib/utils.js";

export const createSubmission = async (req, res) => {
    const { platform, questionName, questionLink, note, topic, difficulty } = req.body;
    const userId = req.user._id; // Assuming user ID is available in req.user

    if (!platform || !questionName) {
        return res.status(400).json({ message: "Platform and question name are required" });
    }

    try {
        const newSubmission = new Submission({
            userId,
            platform,
            questionName,
            questionLink,
            note,
            topic,
            difficulty
        });

        await newSubmission.save();
        return res.status(201).json({
            message: "Submission created successfully",
            submission: newSubmission
        });
    } catch (error) {
        console.error("Error creating submission:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}