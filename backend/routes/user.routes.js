import { userSignup ,userSignin,userlogout,check} from "../controller/userAuth.controller.js";
import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
const router = express.Router();
router.post("/signup", userSignup);
router.post("/signin", userSignin);
router.post("/logout",userlogout); 
router.get("/check",protectRoute, check); // Endpoint to check if user is authenticated
export default router;