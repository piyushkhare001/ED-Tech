import { NextApiRequest, NextApiResponse } from "next";
import RatingAndReview from "@/models/RattingAndReview";

// Get all rating and review
export const getAllRatingReview = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const allReviews = await RatingAndReview.find({})
      .sort({ rating: "desc" })
    //   .populate({
    //     path: "user",
    //     select: "firstName lastName email image", // Specify the fields you want to populate from the "Profile" model
    //   })
      .populate({
        path: "course",
        select: "courseName", // Specify the fields you want to populate from the "Course" model
      })
      .exec();

    res.status(200).json({
      success: true,
      data: allReviews,
    });
  } catch (error :any) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve the rating and review for the course",
      error: error.message,
    });
  }
};
