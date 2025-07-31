import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios.js"; 
export const useDashboardStore = create((set) => ({
  isLoading: false,
  monthlycounts: [],
  platformCounts: [],
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
  }

}));