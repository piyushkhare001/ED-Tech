import { NextApiRequest, NextApiResponse } from "next";
import RatingAndReview from "@/models/RattingAndReview";
import { Course } from "@/models/Course";
import mongoose from "mongoose";

// Extend NextApiRequest to include the user object (if using authentication middleware)
interface AuthenticatedNextApiRequest extends NextApiRequest {
  user?: {
    id: mongoose.Schema.Types.ObjectId;
  };
}

// Create a new rating and review
export const createRating = async (
  req: AuthenticatedNextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    // Ensure the user is authenticated
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. User not authenticated.",
      });
    }

    const userId = req.user.id;
    const { rating, review, courseId }: { rating: number; review: string; courseId: mongoose.Schema.Types.ObjectId } = req.body;

    // Check if the user is enrolled in the course
    const courseDetails = await Course.findOne({
      _id: courseId,
      studentsEnroled: { $elemMatch: { $eq: userId } },
    });

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Student is not enrolled in this course",
      });
    }

    // Check if the user has already reviewed the course
    const alreadyReviewed = await RatingAndReview.findOne({
      user: userId,
      course: courseId,
    });

    if (alreadyReviewed) {
      return res.status(403).json({
        success: false,
        message: "Course already reviewed by user",
      });
    }

    // Create a new rating and review
    const ratingReview = await RatingAndReview.create({
      rating,
      review,
      course: courseId,
      user: userId,
    });

    // Add the rating and review to the course
    await Course.findByIdAndUpdate(courseId, {
      $push: {
        ratingAndReviews: ratingReview,
      },
    });
    await courseDetails.save();

    return res.status(201).json({
      success: true,
      message: "Rating and review created successfully",
      ratingReview,
    });
  } catch (error :any) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
