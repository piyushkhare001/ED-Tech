import mongoose, { Model } from "mongoose";

export interface IStudentPartner {
  userId: mongoose.Types.ObjectId;
  email: string;
  password: string;
  name: string;
  collegeName: string;
  contactNumber: string;
  educationQualification: string;
  branch: string;
  yearOrsemester: string;
  adminApproval: "Approved" | "Rejected" | "Pending";
  coupon: mongoose.Types.ObjectId;
  bankDetails: mongoose.Types.ObjectId;
  referals: mongoose.Types.ObjectId[];
  totBalance: number;
}

const StudentPartnerSchema = new mongoose.Schema<IStudentPartner>({
  email: { type: String },
  name: { type: String },
  password: { type: String },
  collegeName: { type: String },
  contactNumber: { type: String },
  educationQualification: { type: String },
  branch: { type: String },
  yearOrsemester: { type: String },
  adminApproval: {
    type: String,
    enum: ["Approved", "Rejected", "Pending"],
    default: "Pending",
  },
  totBalance: { type: Number, default: 0 },
  referals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Referals" }],
  bankDetails: { type: mongoose.Schema.Types.ObjectId, ref: "BankDetails" },
  coupon: { type: mongoose.Schema.Types.ObjectId, ref: "Coupon" },
});

export const StudentPartner: Model<IStudentPartner> =
  (mongoose.models.StudentPartner as Model<IStudentPartner>) ||
  mongoose.model<IStudentPartner>("StudentPartner", StudentPartnerSchema);

export default StudentPartner;
