// EditModal.jsx
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useSubmissionStore } from "@/store/submissionStore";

const EditModal = ({ isOpen, onClose, submission }) => {
  const { isEditing, editSubmission } = useSubmissionStore();
  const [formData, setFormData] = useState({
    questionName: "",
    platform: "",
    link: "",
    topic: [],
    difficulty: "",
    note: "",
  });

  const difficulties = ["Select", "Easy", "Medium", "Hard"];
  const platforms = ["Select", "LeetCode", "Codeforces", "GFG", "InterviewBit"];

  useEffect(() => {
    if (submission) {
      setFormData({
        questionName: submission.questionName || "",
        platform: submission.platform || "",
        link: submission.link || "",
        topic: Array.isArray(submission.topic)
          ? submission.topic
          : submission.topic?.split(",").map((t) => t.trim()) || [],
        difficulty: submission.difficulty || "",
        note: submission.note || "",
      });
    }
  }, [submission]);

  const resetForm = () => {
    setFormData({
      questionName: "",
      platform: "",
      link: "",
      topic: [],
      difficulty: "",
      note: "",
    });
  };

  const handleSave = async () => {
    if (!submission) return;
    await editSubmission(submission._id, formData);
    onClose();
    resetForm();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-white">Edit Submission</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-gray-300">Question Name</Label>
              <Input
                value={formData.questionName}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, questionName: e.target.value }))
                }
                className="bg-gray-800 border-gray-700 text-white"
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
            <Label className="text-gray-300">Topics (comma-separated)</Label>
            <Input
              value={formData.topic.join(", ")}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  topic: e.target.value.split(",").map((t) => t.trim()).filter(Boolean),
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
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => {
                onClose();
                resetForm();
              }}
              disabled={isEditing}
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={isEditing}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isEditing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditModal;
