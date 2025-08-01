import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios.js"; 
export const useDashboardStore = create((set) => ({
  isLoading: false,
  monthlycounts: [],
  platformCounts: [],
  levelCounts: [],
  currentTarget:0,
  todaySubmission: [],
  isEditting:false,
setIsEditting:(some)=>{
  set({isEditting:some})
},
  getMonthlyCounts: async () => {
        set({ isLoading: true });
        try {
        const response = await axiosInstance.get("/submission/monthly");
        set({ monthlycounts: response.data, isLoading: false });
        } catch (error) {
        console.error("Error fetching monthly counts:", error);
        toast.error("Failed to fetch monthly counts");
        set({ isLoading: false });
        }
    },
  getPlatformCounts: async () => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get("/submission/monthly/platform");
      set({ platformCounts: response.data, isLoading: false });
    } catch (error) {
      console.error("Error fetching platform counts:", error);
      toast.error("Failed to fetch platform counts");
      set({ isLoading: false });
    }
  },
  getlevelCounts: async () => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get("/submission/monthly/level");
      set({ levelCounts: response.data, isLoading: false });
    } catch (error) {
      console.error("Error fetching level counts:", error);
      toast.error("Failed to fetch level counts");
      set({ isLoading: false });
    }
  },
  getTarget: async () => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get("/user/gettarget");
      set({ currentTarget: response.data, isLoading: false });
    } catch (error) {
      console.error("Error fetching target:", error);
      toast.error("Failed to fetch target");
      set({ isLoading: false });
    }
  },
  getTodaySubmission: async () => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get("/submission/todaysubmission");
      set({ todaySubmission: response.data, isLoading: false });
    } catch (error) {
      console.error("Error fetching today's submission:", error);
      toast.error("Failed to fetch today's submission");
      set({ isLoading: false });
    }
  },
  changeTarget:async (change)=>{
    set({isEditting:true})
    try {
      const res=await axiosInstance.patch("/user/updatetarget",change)
      set({currentTarget:res.data})
      
    } catch (error) {
      console.error("Error in changing target:", error);
      toast.error("error in changing target");
    }
    finally{
      set({isEditting:false})
    }
  }




}));