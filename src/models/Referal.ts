import mongoose, { Model } from "mongoose";

export interface IReferral {
  takenBy: mongoose.Types.ObjectId;
  couponUsed: mongoose.Types.ObjectId;
  referedBy: mongoose.Types.ObjectId;
  paymentStatus: "Completed" | "Pending";
  course: mongoose.Types.ObjectId;
}

const ReferralSchema = new mongoose.Schema<IReferral>({
  takenBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  couponUsed: { type: mongoose.Schema.Types.ObjectId, ref: "Coupon" },
  referedBy: { type: mongoose.Schema.Types.ObjectId, ref: "StudnetPartner" },
  paymentStatus: {
    type: String,
    enum: ["Completed", "Pending"],
    default: "Pending",
  },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
});

export const Referral: Model<IReferral> =
  (mongoose.models.Referral as Model<IReferral>) ||
  mongoose.model<IReferral>("Referral", ReferralSchema);

export default Referral;
