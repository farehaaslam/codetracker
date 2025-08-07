import Submission from "../models/submission.model.js";
import { genratejwt } from "../lib/utils.js";
import e from "express";
import  {calculateStreaks} from "../lib/streak.js";
// creating submission
export const createSubmission = async (req, res) => {
    const { platform, questionName, questionLink, note, topic, difficulty } = req.body;
    const userId = req.user._id; 
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
    const userId = req.user._id; 

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
    const userId = req.user._id;

    const today = new Date();
    today.setHours(0, 0, 0, 0); 

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1); 

    try {
        const submissions = await Submission.find({
            userId,
            createdAt: { $gte: today, $lt: tomorrow } 
        }).sort({ createdAt: -1 }); 

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
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1);
    const firstDayOfNextMonth = new Date(year, month + 1, 1); // exclusive
  
    try {
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
              $dateToString: { format: "%Y-%m-%d", date: "$createdAt" ,timezone: "Asia/Kolkata",},
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
  
      // Fill missing dates with count = 0
      const countMap = new Map(submissions.map(item => [item.date, item.count]));
  
      const allDates = [];
      for (let day = 1; day <= daysInMonth; day++) {
        const dateObj = new Date(year, month, day);
        const isoDate = dateObj.toISOString().split("T")[0]; // 'YYYY-MM-DD'
        allDates.push({
          date: isoDate,
          count: countMap.get(isoDate) || 0,
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
  
    // Get the first and last day of the current month
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
  
    try {
      const platformCounts = await Submission.aggregate([
        {
          $match: {
            userId,
            createdAt: {
              $gte: firstDay,
              $lte: lastDay,
            }
          }
        },
        {
          $group: {
            _id: "$platform",
            count: { $sum: 1 }
          }
        },
        {
          $sort: { count: -1 }
        }
      ]);
  
      return res.status(200).json(platformCounts);
    } catch (error) {
      console.error("Error fetching monthly platform counts:", error.message);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  
export const getMonthlylevelCounts = async (req, res) => {
    const userId = req.user._id;

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

    try {
        const levelCounts = await Submission.aggregate([
            {
                $match: {
                    userId,
                    createdAt: {
                        $gte: startOfMonth,
                        $lte: endOfMonth,
                    },
                },
            },
            {
                $addFields: {
                    normalizedDifficulty: {
                        $cond: {
                            if: { $or: [{ $eq: ["$difficulty", null] }, { $eq: ["$difficulty", ""] }] },
                            then: null,
                            else: "$difficulty",
                        },
                    },
                },
            },
            {
                $group: {
                    _id: "$normalizedDifficulty",
                    count: { $sum: 1 },
                },
            },
            { $sort: { count: -1 } },
        ]);

        return res.status(200).json(levelCounts);
    } catch (error) {
        console.error("Error fetching monthly level counts:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};
export const getYearlyMonthlySubmissionCounts = async (req, res) => {
  const userId = req.user._id;

  const now = new Date();
  const currentYear = now.getFullYear();

  const startOfYear = new Date(currentYear, 0, 1); // Jan 1
  const endOfYear = new Date(currentYear + 1, 0, 1); // Jan 1 of next year

  try {
    // 1. Get actual submission counts grouped by month
    const submissions = await Submission.aggregate([
      {
        $match: {
          userId,
          createdAt: {
            $gte: startOfYear,
            $lt: endOfYear,
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%m", date: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          month: "$_id",
          count: 1,
          _id: 0,
        },
      },
    ]);

    // 2. Create a map from the result
    const submissionMap = new Map(submissions.map(item => [item.month, item.count]));

    // 3. Build the final array with all months
    const months = [
      "01", "02", "03", "04", "05", "06",
      "07", "08", "09", "10", "11", "12"
    ];

    const result = months.map((month, index) => ({
      month: new Date(currentYear, index).toLocaleString('default', { month: 'short' }), // Jan, Feb...
      count: submissionMap.get(month) || 0,
    }));

    return res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching monthly submission counts:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const getUserStreaks = async (req, res) => {
    const userId = req.user._id;
  
    try {
       const submissions = await Submission.find({ userId }).sort({ createdAt: 1 });

    if (!submissions.length) {
      return res.status(200).json({ currentStreak: 0, longestStreak: 0 });
    }

    const {currentStreak,longestStreak} = calculateStreaks(submissions);
    console.log(currentStreak)
    console.log(longestStreak)
    return res.status(200).json({ currentStreak, longestStreak });
  
    } catch (error) {
      console.error("Error fetching streaks:", error.message);
      return res.status(500).json({ message: "Internal server error" });
    }
  };


export const todaySubmission = async (req, res) => {
  const userId = req.user._id;
  try {
    // Current UTC timestamp in milliseconds
    const utcNowMs = new Date().getTime();

    // IST offset in milliseconds (5 hours 30 minutes)
    const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000; // 19800000 ms

    // Current IST timestamp in milliseconds
    const istNowMs = utcNowMs + IST_OFFSET_MS;

    // Milliseconds in a day
    const DAY_MS = 24 * 60 * 60 * 1000;

    // Time of day in IST (milliseconds since IST midnight)
    const istTimeOfDayMs = istNowMs % DAY_MS;

    // IST midnight timestamp (in IST-adjusted ms)
    const istStartMs = istNowMs - istTimeOfDayMs;

    // Corresponding UTC start timestamp for IST midnight
    const utcStartMs = istStartMs - IST_OFFSET_MS;

    // UTC end timestamp (next IST midnight)
    const utcEndMs = utcStartMs + DAY_MS;

    // Create Date objects for query
    const utcStart = new Date(utcStartMs);
    const utcEnd = new Date(utcEndMs);

    const count = await Submission.countDocuments({
      userId,
      createdAt: { $gte: utcStart, $lt: utcEnd }
    });

    return res.status(200).json({ count });
  } catch (error) {
    console.error("Error fetching today's submission count:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

