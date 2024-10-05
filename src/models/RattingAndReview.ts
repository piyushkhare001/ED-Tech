import mongoose, { Schema, Document, Model } from "mongoose";

// Define the interface for the RatingAndReview document
interface IRatingAndReview extends Document {
  user: mongoose.Schema.Types.ObjectId;
  rating: number;
  review: string;
  course: mongoose.Schema.Types.ObjectId;
}

// Define the RatingAndReview schema
const ratingAndReviewSchema: Schema<IRatingAndReview> = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  rating: {
    type: Number,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Course",
    index: true,
  },
});

// Export the RatingAndReview model
const RatingAndReview: Model<IRatingAndReview> = mongoose.model<IRatingAndReview>(
  "RatingAndReview",
  ratingAndReviewSchema
);

export default RatingAndReview;
