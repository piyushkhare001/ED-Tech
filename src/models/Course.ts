import mongoose, { Model } from "mongoose";

export interface ICourse {
  appxCourseId: string;
  title: string;
  imageUrl: string;
  description: string;
  openToEveryone: boolean;
  price: number;
  content: mongoose.Types.ObjectId[]; // Connecting to Lecture schema (content represents lectures)
  purchasedBy: mongoose.Types.ObjectId[];
  certIssued: boolean;
  createdBy: mongoose.Types.ObjectId;
  publish:boolean;
}

const CourseSchema = new mongoose.Schema<ICourse>({
  appxCourseId: { type: String, required: true },
  title: { type: String, required: true },
  imageUrl: String,
  description: String,
  openToEveryone: { type: Boolean, default: false },
  price: { type: Number, required: true },
  content: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lecture" }], // Reference to Lecture
  purchasedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  certIssued: { type: Boolean, default: false },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  publish:{type:Boolean,default:false}
});

export const Course: Model<ICourse> =
  mongoose.models.Course || mongoose.model<ICourse>("Course", CourseSchema);
