import express from "express";
//import { submissionCreate, submissionGetAll, submissionGetById, submissionUpdate, submissionDelete } from "../controller/submission.controller.js";
import { createSubmission } from "../controller/submission.controller.js";  
const router = express.Router();
import { protectRoute } from "../middleware/auth.middleware.js";
// Route to create a new submission
router.post("/create", protectRoute, createSubmission);

export default router;