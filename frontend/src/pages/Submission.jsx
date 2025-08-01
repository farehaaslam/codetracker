import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Toaster } from "react-hot-toast";
import {
  Plus,
  Filter,
  RotateCcw,
  Edit,
  Trash2,
  ExternalLink,
  Download,
  CalendarIcon,
  Clock,
  Search,
  Loader2,
} from "lucide-react";
import EditModal from "@/components/section/EditModal";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useSubmissionStore } from "../store/submissionStore";
import SubHeader from "@/components/section/SubHeader";
const platforms = ["All", "LeetCode", "Codeforces", "HackerRank", "AtCoder"];
const difficulties = ["All", "Easy", "Medium", "Hard"];

export default function SubmissionsDashboard() {
  const {
    submissions,
    isLoading,
    isCreating,
    isEditing,
    fetchSubmissions,
    createSubmission,
    editSubmission,
    deleteSubmission,
    searchsubmissions,
  } = useSubmissionStore();

  const [editingSubmission, setEditingSubmission] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Filter states
  const [filters, setFilters] = useState({
    platform: "All",
    topic: "",
    difficulty: "All",
    startDate: null,
    endDate: null,
    search: "",
  });

  // Form states
  const [formData, setFormData] = useState({
    questionName: "",
    platform: "",
    link: "",
    topic: [],
    difficulty: "",
    note: "",
  });

  // Fetch submissions on component mount
  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  // Filter submissions locally based on current filters
  const filteredSubmissions = Array.isArray(submissions)
    ? submissions.filter((submission) => {
        if (
          filters.platform !== "All" &&
          submission.platform !== filters.platform
        ) {
          return false;
        }
        if (
          filters.difficulty !== "All" &&
          submission.difficulty !== filters.difficulty
        ) {
          return false;
        }
        if (
          filters.topic &&
          (!submission.topic ||
            !Array.isArray(submission.topic) ||
            !submission.topic.some((top) =>
              top.toLowerCase().includes(filters.topic.toLowerCase())
            ))
        ) {
          return false;
        }

        if (
          filters.search &&
          !submission.questionName
            .toLowerCase()
            .includes(filters.search.toLowerCase())
        ) {
          return false;
        }

        const submissionDate = new Date(submission.createdAt);
        if (filters.startDate) {
          const startStr = format(filters.startDate, "yyyy-MM-dd");
          const subStr = format(submissionDate, "yyyy-MM-dd");
          if (subStr < startStr) return false;
        }
        if (filters.endDate) {
          const endStr = format(filters.endDate, "yyyy-MM-dd");
          const subStr = format(submissionDate, "yyyy-MM-dd");
          if (subStr > endStr) return false;
        }
        return true;
      })
    : [];

  const handleEdit = (submission) => {
    setEditingSubmission(submission);
    // Normalize topic to array if it's not
    let normalizedTopic = submission.topic;
    if (typeof normalizedTopic === "string") {
      normalizedTopic = normalizedTopic.split(",").map((t) => t.trim()).filter(Boolean);
    } else if (!Array.isArray(normalizedTopic)) {
      normalizedTopic = normalizedTopic ? [normalizedTopic] : [];
    }
    setFormData({
      questionName: submission.questionName,
      platform: submission.platform,
      link: submission.link,
      topic: normalizedTopic,
      difficulty: submission.difficulty,
      note: submission.note,
    });
    setIsEditModalOpen(true);
  };

  const handleSave = async () => {
    if (!editingSubmission) return;

    await editSubmission(editingSubmission._id, formData);
    setIsEditModalOpen(false);
    setEditingSubmission(null);
    resetForm();
  };



  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this submission?")) {
      await deleteSubmission(id);
    }
  };

  const resetFilters = () => {
    setFilters({
      platform: "All",
      topic: "",
      difficulty: "All",
      startDate: null,
      endDate: null,
      search: "",
    });
    fetchSubmissions();
  };

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

  const handleSearch = async () => {
    if (filters.search.trim()) {
      await searchsubmissions(filters.search);
    } else {
      await fetchSubmissions();
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      case "Medium":
        return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      case "Hard":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getPlatformColor = (platform) => {
    switch (platform) {
      case "LeetCode":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "Codeforces":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "HackerRank":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      default:
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
    }
  };

  return (
    <div className="min-h-screen text-white  ">
      <div className="mx-auto max-w-7xl p-4 md:p-6 mt-[25px] flex gap-[25px] flex-col">
        {/* Header */}
        <SubHeader />

        {/* Filter Panel */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Filter className="h-5 w-5 text-purple-400" />
              Filter Submissions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
              {/* Search */}
              <div className="space-y-2">
                <Label className="text-gray-300">Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search questions..."
                    value={filters.search}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        search: e.target.value,
                      }))
                    }
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                  />
                </div>
              </div>

              {/* Platform */}
              <div className="space-y-2">
                <Label className="text-gray-300">Platform</Label>
                <Select
                  value={filters.platform}
                  onValueChange={(value) =>
                    setFilters((prev) => ({ ...prev, platform: value }))
                  }
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    {platforms.map((platform) => (
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

              {/* Topic */}
              <div className="space-y-2">
                <Label className="text-gray-300">Topic</Label>
                <Input
                  placeholder="Search topic..."
                  value={filters.topic}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, topic: e.target.value }))
                  }
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                />
              </div>

              {/* Difficulty */}
              <div className="space-y-2">
                <Label className="text-gray-300">Difficulty</Label>
                <Select
                  value={filters.difficulty}
                  onValueChange={(value) =>
                    setFilters((prev) => ({ ...prev, difficulty: value }))
                  }
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    {difficulties.map((difficulty) => (
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

              {/* Start Date */}
              <div className="space-y-2">
                <Label className="text-gray-300">Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal bg-gray-800 border-gray-700 text-white hover:bg-gray-700",
                        !filters.startDate && "text-gray-500"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {filters.startDate
                        ? format(filters.startDate, "PPP")
                        : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700">
                    <Calendar
                      mode="single"
                      selected={filters.startDate || undefined}
                      onSelect={(date) =>
                        setFilters((prev) => ({
                          ...prev,
                          startDate: date || null,
                        }))
                      }
                      initialFocus
                      className="text-white"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* End Date */}
              <div className="space-y-2">
                <Label className="text-gray-300">End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal bg-gray-800 border-gray-700 text-white hover:bg-gray-700",
                        !filters.endDate && "text-gray-500"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {filters.endDate
                        ? format(filters.endDate, "PPP")
                        : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700">
                    <Calendar
                      mode="single"
                      selected={filters.endDate || undefined}
                      onSelect={(date) =>
                        setFilters((prev) => ({
                          ...prev,
                          endDate: date || null,
                        }))
                      }
                      initialFocus
                      className="text-white"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <Button
                onClick={handleSearch}
                className="bg-purple-600 hover:bg-purple-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Search className="mr-2 h-4 w-4" />
                )}
                Search
              </Button>
              <Button
                onClick={resetFilters}
                variant="outline"
                className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="flex items-center justify-between">
          <p className="text-gray-400">
            Showing {filteredSubmissions.length} of{" "}
            {Array.isArray(submissions) ? submissions.length : 0} submissions
          </p>
          {isLoading && (
            <div className="flex items-center gap-2 text-purple-400">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading...
            </div>
          )}
        </div>

        {/* Submissions Grid */}
        

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredSubmissions.map((submission) => (
            <Card
              key={submission._id}
              className="bg-gray-900/50 border-gray-800 hover:border-purple-500/50 transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/10"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <a
                      href={submission.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-white hover:text-purple-400 transition-colors flex items-center gap-2 group"
                    >
                      {submission.questionName}
                      <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                    <div className="flex items-center gap-2">
                      <Badge
                        className={cn(
                          "border",
                          getPlatformColor(submission.platform)
                        )}
                      >
                        {submission.platform}
                      </Badge>
                      <Badge
                        className={cn(
                          "border",
                          getDifficultyColor(submission.difficulty)
                        )}
                      >
                        {submission.difficulty}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-1">
                  {Array.isArray(submission.topic)
                    ? submission.topic.map((top) => (
                        <Badge
                          key={top}
                          variant="secondary"
                          className="text-xs bg-gray-800 text-gray-300 border-gray-700"
                        >
                          {top}
                        </Badge>
                      ))
                    : null}
                </div>

                <p className="text-sm text-gray-400 line-clamp-3">
                  {submission.note?.length > 100
                    ? `${submission.note.substring(0, 100)}...`
                    : submission.note || ""}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-gray-800">
                  <p className="text-xs text-gray-500">
                    {format(
                      new Date(submission.createdAt),
                      "MMM d, yyyy 'at' h:mm a"
                    )}
                  </p>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEdit(submission)}
                      className="text-gray-400 hover:text-purple-400 hover:bg-purple-500/10"
                      disabled={isEditing}
                    >
                      {isEditing ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Edit className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(submission._id)}
                      className="text-gray-400 hover:text-red-400 hover:bg-red-500/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSubmissions.length === 0 && !isLoading && (
          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mb-4">
                <Search className="h-8 w-8 text-purple-400" />
              </div>
              <p className="text-xl font-medium text-white mb-2">
                No submissions found
              </p>
              <p className="text-gray-400 text-center max-w-md">
                {!Array.isArray(submissions) || submissions.length === 0
                  ? "Create your first submission to get started"
                  : "Try adjusting your filters or search terms"}
              </p>
              <Button
                className="mt-4 bg-purple-600 hover:bg-purple-700"
                onClick={() => setIsCreateModalOpen(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add First Submission
              </Button>
            </CardContent>
          </Card>
        )}


           <EditModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingSubmission(null);
        }}
        submission={editingSubmission}
      />
        
      </div>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#1f2937",
            color: "#fff",
            border: "1px solid #374151",
          },
        }}
      />
    </div>
  );
}
