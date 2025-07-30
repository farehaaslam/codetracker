import { axiosInstance } from "../lib/axios.js";
import { create } from "zustand";
import toast from "react-hot-toast";


export const useSubmissionStore = create((set) => ({
    submissions: [],
    isLoading: false,
    isCreating: false,
    isEditing: false,
    isDeleting: false,
    isSearching: false,
    resetForm:false,
    
    fetchSubmissions: async () => {
        set({ isLoading: true });
        try {
            const res = await axiosInstance.get("/submission/all");
            console.log("Fetched submissions:", res.data);
            set({ submissions: res.data });
        } catch (error) {
            console.error("Error fetching submissions:", error);
            toast.error("Failed to fetch submissions.");
        } finally {
            set({ isLoading: false });
        }
    },
    createSubmission: async (formData) => {
        set({setIsCreateModalOpen: true});

        set({ isCreating: true });
        try {
            const res = await axiosInstance.post("/submission/create", formData);
            console.log("Created submission:", res.data);
            set((state) => ({
                submissions: [res.data.submission, ...state.submissions],
            }));
            toast.success("Submission created successfully!");
        } catch (error) {
            console.error("Error creating submission:", error);
            toast.error("Failed to create submission.");
        } finally {
            set({ isCreating: false });
        }
        set({ isCreateModalOpen: false });
        set({ resetForm: true });
    },
    editSubmission: async (submissionId, formData) => {
        set({ isEditing: true });
        try {
            const res = await axiosInstance.patch(`/submission/edit/${submissionId}`, formData);
            console.log("Updated submission:", res.data);
            set((state) => ({
                submissions: state.submissions.map((sub) =>
                    sub._id === submissionId ? res.data.submission : sub
                ),
            }));
            toast.success("Submission updated successfully!");
        } catch (error) {
            console.error("Error updating submission:", error);
            toast.error("Failed to update submission.");
        } finally {
            set({ isEditing: false });
        }
    },
    deleteSubmission: async (submissionId) => {
        try {
            await axiosInstance.delete(`/submission/delete/${submissionId}`);
            set((state) => ({
                submissions: state.submissions.filter((sub) => sub._id !== submissionId),
            }));
            toast.success("Submission deleted successfully!");
        } catch (error) {
            console.error("Error deleting submission:", error);
            toast.error("Failed to delete submission.");
        }
    },
    searchsubmissions: async (query) => {
        set({ isLoading: true });
        try {
            const res = await axiosInstance.get(`/submission/search?query=${query}`);
            console.log("Searched submissions:", res.data);
            set({ submissions: res.data });
        } catch (error) {
            console.error("Error searching submissions:", error);
            toast.error("Failed to search submissions.");
        } finally {
            set({ isLoading: false });
        }
    }
   
    

}))