import mongoose, { Model } from "mongoose";
export interface ICourse {
  appxCourseId: string;
  title: string;
  imageUrl: string;
  description: string;
  openToEveryone: boolean;
  slug: string;
  content: mongoose.Types.ObjectId[];
  purchasedBy: mongoose.Types.ObjectId[];
  certIssued: boolean;
  createdBy: mongoose.Types.ObjectId;
}

const CourseSchema = new mongoose.Schema<ICourse>({
  appxCourseId: String,
  title: String,
  imageUrl: String,
  description: String,
  openToEveryone: { type: Boolean, default: false },
  slug: String,
  content: [{ type: mongoose.Schema.Types.ObjectId, ref: "Content" }],
  purchasedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  certIssued: { type: Boolean, default: false },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export const Course: Model<ICourse> =
  mongoose.models.Course || mongoose.model<ICourse>("Course", CourseSchema);
