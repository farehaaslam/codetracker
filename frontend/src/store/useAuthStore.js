import { axiosInstance } from "../lib/axios.js";
import { create } from "zustand";
import toast from "react-hot-toast";


export const useAuthStore = create((set) => ({
    
    authUser:null,
    isSigningup:false,
    isLoggingIn:false,
    isUpdatingProfile:false,
    isCheckingAuth:true,

    checkAuth: async () => {
        set({ isCheckingAuth: true });
        try {
            const res= await axiosInstance.get("/user/check");
            set({ authUser: res.data});
        } catch (error) {
            set({ authUser: null });
            console.error("Error checking authentication:", error);
        }
        finally{
            set({ isCheckingAuth: false });
        }
    },
    signup:async (formData) => {
        set({ isSigningup: true });
        try {
            console.log("Signing up with data:", formData);
            const res = await axiosInstance.post("/user/signup", formData);
            set({ authUser: res.data });
            toast.success("Signup successful!");
        } catch (error) {
            console.error("Error during signup:", error);
            toast.error("Signup failed. Please try again.");
        } finally {
            set({ isSigningup: false });
        }
    },
    signin: async (formData) => {
        set({ isLoggingIn: true });
        try {
            console.log("Signing in with data:", formData);
            const res = await axiosInstance.post("/user/signin", formData);
            set({ authUser: res.data });
            toast.success("Login successful!");
        } catch (error) {
            console.error("Error during login:", error);
            toast.error("Login failed. Please try again.");
        } finally {
            set({ isLoggingIn: false });
        }
    },


}))