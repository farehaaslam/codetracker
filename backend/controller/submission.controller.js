import Submission from "../models/submission.model.js";
import { genratejwt } from "../lib/utils.js";
// creating submission
export const createSubmission = async (req, res) => {
    const { platform, questionName, questionLink, note, topic, difficulty } = req.body;
    const userId = req.user._id; // Assuming user ID is available in req.user
console.log("Creating submission for user:", userId);
    if (!platform || !questionName) {
        return res.status(400).json({ message: "Platform and question name are required" });
    }

    try {
        const newSubmission = new Submission({
            userId,
            platform,
            questionName,
            questionLink,
            note,
            topic,
            difficulty
        });

        await newSubmission.save();
        return res.status(201).json({
            message: "Submission created successfully",
            submission: newSubmission
        });
    } catch (error) {
        console.error("Error creating submission:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}
// all submission of user 
export const getAllSubmissions = async (req, res) => {
    const userId = req.user._id; // Assuming user ID is available in req.user

    try {
        const submissions = await Submission.find({ userId }).sort({ createdAt: -1 });
        return res.status(200).json(submissions);
    } catch (error) {
        console.error("Error fetching submissions:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}
//edit submiss
export const editSubmission = async (req, res) => {
    //console.log(req.params.submissionId);
    console.log("Body received:", req.body);

    const { submissionId } = req.params;
    const { platform, questionName, questionLink, note, topic, difficulty } = req.body;

    try {
        const updatedSubmission = await Submission.findByIdAndUpdate(
            submissionId,
            { platform, questionName, questionLink, note, topic, difficulty },
            { new: true }
        );

        if (!updatedSubmission) {
            return res.status(404).json({ message: "Submission not found" });
        }
        console.log("Updated Submission:", updatedSubmission);


        return res.status(200).json({
            message: "Submission updated successfully",
            submission: updatedSubmission
        });
    } catch (error) {
        console.error("Error updating submission:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}
// delete submission
export const deleteSubmission = async (req, res) => {
    const { submissionId } = req.params;

    try {
        const deletedSubmission = await Submission.findByIdAndDelete(submissionId);

        if (!deletedSubmission) {
            return res.status(404).json({ message: "Submission not found" });
        }

        return res.status(200).json({
            message: "Submission deleted successfully",
            submission: deletedSubmission
        });
    } catch (error) {
        console.error("Error deleting submission:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}
//today submission
export const getTodaySubmissions = async (req, res) => {
    const userId = req.user._id; // Authenticated user ID

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Today at 00:00

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1); // Tomorrow at 00:00

    try {
        const submissions = await Submission.find({
            userId,
            createdAt: { $gte: today, $lt: tomorrow } // strictly today's submissions
        }).sort({ createdAt: -1 }); // Optional: newest first

        return res.status(200).json(submissions);
    } catch (error) {
        console.error("Error fetching today's submissions:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};
export const filterSubmissions = async (req, res) => {
    const userId = req.user._id;

    const { platform, difficulty, topic } = req.query;

    // Build dynamic filter object
    const filter = { userId };

    if (platform) filter.platform = platform;
    if (difficulty) filter.difficulty = difficulty;
    if (topic) filter.topic = topic;

    try {
        const submissions = await Submission.find(filter).sort({ createdAt: -1 });
        return res.status(200).json(submissions);
    } catch (error) {
        console.error("Error filtering submissions:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};
export const getSubmissionById = async (req, res) => {
    const { submissionId } = req.params;

    try {
        const submission = await Submission.findById(submissionId);

        if (!submission) {
            return res.status(404).json({ message: "Submission not found" });
        }

        return res.status(200).json(submission);
    } catch (error) {
        console.error("Error fetching submission by ID:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}
export const searchSubmissions = async (req, res) => {
    try {
        const { topic, platform, difficulty } = req.query;
        const userId = req.user._id;

        const query = { userId };

        if (topic && typeof topic === 'string') {
            query.topic = { $regex: topic, $options: "i" };
        }

        if (platform && typeof platform === 'string') {
            query.platform = { $regex: platform, $options: "i" };
        }

        if (difficulty && typeof difficulty === 'string') {
            query.difficulty = difficulty; // exact match, no regex
        }

        const results = await Submission.find(query).sort({ createdAt: -1 });

        res.status(200).json(results);
    } catch (error) {
        console.error("Error searching submissions:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const getMonthlySubmissionCounts = async (req, res) => {
  const userId = req.user._id;

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // 0-indexed
  const firstDayOfMonth = new Date(year, month, 1);
  const firstDayOfNextMonth = new Date(year, month + 1, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  try {
    // Aggregate submissions grouped by date
    const submissions = await Submission.aggregate([
      {
        $match: {
          userId,
          createdAt: {
            $gte: firstDayOfMonth,
            $lt: firstDayOfNextMonth,
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          date: "$_id",
          count: 1,
        },
      },
      { $sort: { date: 1 } },
    ]);

    // Fill missing dates with count: 0
    const countMap = new Map(submissions.map(item => [item.date, item.count]));

    const allDates = [];
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day).toISOString().split("T")[0];
      allDates.push({
        date,
        count: countMap.get(date) || 0,
      });
    }

    return res.status(200).json(allDates);
  } catch (error) {
    console.error("Error fetching monthly submission counts:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const getMonthlyPlatformCounts = async (req, res) => {
    const userId = req.user._id;

    try {
        const platformCounts = await Submission.aggregate([
            { $match: { userId } },
            {
                $group: {
                    _id: "$platform",
                    count: { $sum: 1 }
                }
            },
            { $sort: { count: -1 } }
        ]);

        return res.status(200).json(platformCounts);
    } catch (error) {
        console.error("Error fetching monthly platform counts:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};