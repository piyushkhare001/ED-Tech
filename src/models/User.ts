import mongoose, { Model } from "mongoose";

// Define interface for course progress
export interface ICourseProgress {
  courseId: mongoose.Types.ObjectId; // Reference to the course
  completedContent: mongoose.Types.ObjectId[]; // List of completed content
  progressPercentage: number; // Percentage of course completed
  createdAt: Date;
  updatedAt: Date;
}

// Define interface for user
export interface IUser {
  name?: string;
  email: string;
  password: string;
  state: string;
  city: string;
  otp?: string;
  otpExpiresAt?: Date;
  role: "student" | "studentPartner" | "admin" | "teacher";
  verified?: boolean;
  collegeName: string;
  resetPasswordToken?: string;
  resetPasswordExpiresAt?: Date;
  courses: ICourseProgress[];
  // Merged field for enrolled courses and progress
}

// Define the User schema
const UserSchema = new mongoose.Schema<IUser>({
  name: { type: String },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["student", "admin", "teacher"],
    default: "student",
  },
  verified: { type: Boolean, default: undefined },
  resetPasswordToken: { type: String },
  resetPasswordExpiresAt: { type: Date },
  otp: { type: String },
  otpExpiresAt: { type: Date },
  courses: [
    {
      courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
      },
      completedContent: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Content" },
      ],
      progressPercentage: { type: Number, default: 0 },
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now },
    },
  ],
});

// Use type assertion to ensure the model has the correct type
export const User: Model<IUser> =
  (mongoose.models.User as Model<IUser>) ||
  mongoose.model<IUser>("User", UserSchema);

export default User;
