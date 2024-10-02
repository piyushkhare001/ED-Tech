import { NextApiRequest, NextApiResponse } from "next";
import RatingAndReview from "@/models/RattingAndReview";
import mongoose from "mongoose";

// Get the average rating for a course
export const getAverageRating = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const { courseId }: { courseId: string } = req.body;

    // Calculate the average rating using the MongoDB aggregation pipeline
    const result = await RatingAndReview.aggregate([
      {
        $match: {
          course: new mongoose.Types.ObjectId(courseId), // Convert courseId to ObjectId
        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      },
    ]);

    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        averageRating: result[0].averageRating,
      });
    }

    // If no ratings are found, return 0 as the default rating
    return res.status(200).json({ success: true, averageRating: 0 });
  } catch (error : any) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve the rating for the course",
      error: error.message,
    });
  }
};
