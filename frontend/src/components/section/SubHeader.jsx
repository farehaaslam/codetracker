import React from 'react'
import { Button } from '@/components/ui/button'
import { Loader2, Plus, Clock, Download } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useSubmissionStore } from '@/store/submissionStore'
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const SubHeader = () => {
    const { isCreating,createSubmission} =useSubmissionStore() 
    const platforms = ["All", "LeetCode", "Codeforces", "HackerRank"];
    const difficulties = ["All", "Easy", "Medium", "Hard"];
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [formData, setFormData] = useState({
    questionName: "",
    platform: "",
    link: "",
    topic: [],
    difficulty: "",
    note: "",
  });
  const resetForm = () => {
    setFormData({
      questionName: "",
      platform: "",
      link: "",
      topic: [],
      difficulty: "",
      note: "",
    });
  }
    const handleCreate = async () => {
    await createSubmission(formData);
    setIsCreateModalOpen(false);
    resetForm();
  };

  return (
    <div>
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-[20px] px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm">
            <div className="w-2 h-2 bg-purple-500 rounded-full "></div>
            Coding Progress Tracker
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-violet-400 to-purple-600 bg-clip-text text-transparent">
              Track Your Coding Journey
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Monitor your progress, filter submissions, and stay consistent
              with your coding practice
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <Button
              className="bg-purple-600 hover:bg-purple-700 text-white"
              onClick={() => setIsCreateModalOpen(true)}
              disabled={isCreating}
            >
              {isCreating ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Plus className="mr-2 h-4 w-4" />
              )}
              Add Submission Manually
            </Button>
            <Button
              className="bg-purple-600 hover:bg-purple-700 text-white"
             
            >
              Fetch from extension
            </Button>
          
         
          </div>
        </div>
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-800 text-white">
            <DialogHeader>
              <DialogTitle className="text-white">
                Create New Submission
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-gray-300">Question Name</Label>
                  <Input
                    value={formData.questionName}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        questionName: e.target.value,
                      }))
                    }
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="Enter question name"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-300">Platform</Label>
                  <Select
                    value={formData.platform}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, platform: value }))
                    }
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      {platforms.slice(1).map((platform) => (
                        <SelectItem
                          key={platform}
                          value={platform}
                          className="text-white hover:bg-gray-700"
                        >
                          {platform}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300">Link</Label>
                <Input
                  type="url"
                  value={formData.link}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, link: e.target.value }))
                  }
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="https://leetcode.com/problems/..."
                />
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300">Difficulty</Label>
                <Select
                  value={formData.difficulty}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, difficulty: value }))
                  }
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    {difficulties.slice(1).map((difficulty) => (
                      <SelectItem
                        key={difficulty}
                        value={difficulty}
                        className="text-white hover:bg-gray-700"
                      >
                        {difficulty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300">
                  Topics (comma-separated)
                </Label>
                <Input
                  value={formData.topic.join(", ")}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      topic: e.target.value
                        .split(",")
                        .map((t) => t.trim())
                        .filter(Boolean),
                    }))
                  }
                  placeholder="Array, Hash Table, DP"
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300">Note</Label>
                <Textarea
                  value={formData.note}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, note: e.target.value }))
                  }
                  rows={4}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="Add your notes, approach, or solution details..."
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsCreateModalOpen(false);
                    resetForm();
                  }}
                  disabled={isCreating}
                  className="border-gray-700 text-gray-300 hover:bg-gray-800"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCreate}
                  disabled={
                    isCreating || !formData.questionName || !formData.platform
                  }
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {isCreating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Submission"
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
    </div>
  )
}

export default SubHeader