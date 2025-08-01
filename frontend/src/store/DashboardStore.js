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
  yearlySubmission:[],
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
  changeTarget: async (target) => {
    set({ isEditting: true });
    console.log("new tar to change",target)
    try {
      const res = await axiosInstance.patch("/user/updatetarget",{ target});
      console.log(res.data)
      const updatedTarget = res.data;
      set({ currentTarget: updatedTarget });
      console.log("Successfully updated target:", updatedTarget);
    } catch (error) {
      console.error("Error updating target:", error);
      toast.error("Error updating target");
    } finally {
      set({ isEditting: false });
    }
  },
  getYearly:async ()=>{
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get("/submission/yearly");
      set({ yearlySubmission: response.data, isLoading: false });
  }
    catch (error) {
      console.error("Error getting yearly:", error);
      toast.error("Error getting yearly");
    } finally {
      set({ isEditting: false });
    }


}
}));