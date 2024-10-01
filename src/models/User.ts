import mongoose, { Model } from "mongoose";
export interface IUser {
  name?: string;
  email: string;
  password: string;
  role: "student" | "studentPartner" | "admin" | "teacher";
  appxUserId?: string;
  appxUsername?: string;
  coupons: mongoose.Types.ObjectId[];
  resetPasswordToken?: string;
  resetPasswordExpiresAt?: Date;
}

const UserSchema = new mongoose.Schema<IUser>({
  name: { type: String },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["student", "studentPartner", "admin", "teacher"],
    default: "student",
  },
  resetPasswordToken: { type: String },
  resetPasswordExpiresAt: { type: Date },
  appxUserId: { type: String },
  appxUsername: { type: String },
  coupons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Coupon" }],
});

// Use type assertion to ensure the model has the correct type
export const User: Model<IUser> =
  (mongoose.models.User as Model<IUser>) ||
  mongoose.model<IUser>("User", UserSchema);


  export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);