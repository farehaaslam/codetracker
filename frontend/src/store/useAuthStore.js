import { axiosInstance } from "../lib/axios.js";
import { create } from "zustand";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningup: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    // Prevent multiple simultaneous auth checks
    const token = localStorage.getItem("accessToken");
    const refresh = localStorage.getItem("refreshToken");

    if (!token && !refresh) {
      set({ authUser: null, isCheckingAuth: false });
      return;
    }

    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.get("/user/check");
      set({ authUser: res.data });
    } catch (error) {
      // Only set authUser to null if it's a 401 (unauthorized)
      if (error.response?.status === 401) {
        set({ authUser: null });
      }
      console.error("Error checking authentication:", error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async (formData) => {
    set({ isSigningup: true });
    try {
     // console.log("Signing up with data:", formData);
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
      //console.log("Signing in with data:", formData);
      const res = await axiosInstance.post("/user/signin", formData);
      set({ authUser: res.data });
      localStorage.setItem("accessToken", res.data.accessToken); // Store tokens for later use
      localStorage.setItem("refreshToken", res.data.refreshToken);
      toast.success("Login successful!");
      return res.data;
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Login failed. Please try again.");
      return null;
    } finally {
      set({ isLoggingIn: false });
    }
  },
  logout: async () => {
    try {
     // console.log("Logging out");
      const refreshToken = localStorage.getItem("refreshToken");
     // console.log(refreshToken);
      await axiosInstance.post("/user/logout", { refreshToken });
      localStorage.removeItem("accessToken"); // Clean up stored tokens
      localStorage.removeItem("refreshToken");
      set({ authUser: null });
      toast.success("Logout successful!");
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("Logout failed. Please try again.");
    }
  },
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.patch("/user/updateprofile", data);
      set({ authUser: res.data });
      toast.success("update profile photo succesfully");
    } catch (error) {
      console.error("error while updating profile", error);
      toast.error("unable to upload progile picture");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));
