import mongoose, { Model } from "mongoose";

export interface IStudentPartner {
  userId: mongoose.Types.ObjectId;
  email: string;
  adminApproval: "Approved" | "Rejected" | "Pending";
  coupons: mongoose.Types.ObjectId[];
  referals: mongoose.Types.ObjectId[];
  balance: number;
}

const StudentPartnerSchema = new mongoose.Schema<IStudentPartner>({
  email: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  adminApproval: {
    type: String,
    enum: ["Approved", "Rejected", "Pending"],
    default: "Pending",
  },
  balance: { type: Number, default: 0 },

  referals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Referals" }],
  coupons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Coupon" }],
});

// Use type assertion to ensure the model has the correct type
export const StudentPartner: Model<IStudentPartner> =
  (mongoose.models.StudentPartner as Model<IStudentPartner>) ||
  mongoose.model<IStudentPartner>("StudentPartner", StudentPartnerSchema);

export default StudentPartner;
