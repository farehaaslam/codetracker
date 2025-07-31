import express from "express";
import { createSubmission, deleteSubmission, editSubmission, filterSubmissions, getAllSubmissions, getTodaySubmissions,getSubmissionById ,searchSubmissions,getMonthlySubmissionCounts,getMonthlyPlatformCounts} from "../controller/submission.controller.js";  
const router = express.Router();
import { protectRoute } from "../middleware/auth.middleware.js";
router.post("/create", protectRoute, createSubmission);
router.get("/all", protectRoute, getAllSubmissions);

router.get("/today",protectRoute,getTodaySubmissions)
router.get("/filter",protectRoute,filterSubmissions)
router.get("/search", protectRoute, searchSubmissions);
router.get("/monthly", protectRoute, getMonthlySubmissionCounts);
router.get("/monthly/platform", protectRoute, getMonthlyPlatformCounts);
router.patch("/edit/:submissionId", protectRoute, editSubmission);
router.delete("/delete/:submissionId", protectRoute, deleteSubmission);
router.get("/:submissionId", protectRoute, getSubmissionById);



export default router;