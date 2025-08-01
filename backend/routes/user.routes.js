import { userSignup ,userSignin,userlogout,check,updateProfile,updateTarget,getTarget} from "../controller/userAuth.controller.js";
import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
const router = express.Router();
router.post("/signup", userSignup);
router.post("/signin", userSignin);
router.post("/logout",userlogout); 
router.get("/check",protectRoute, check);
router.patch("/updateprofile",protectRoute, updateProfile); // Endpoint to check if user is authenticated
router.patch("/updatetarget",protectRoute, updateTarget);
router.get("/gettarget",protectRoute, getTarget);
export default router;