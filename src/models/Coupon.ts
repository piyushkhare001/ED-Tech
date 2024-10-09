import mongoose, { Model } from "mongoose";
export interface ICoupon {
  code: string;
  discountPercentage: number;
  validFrom: Date;
  validUntil: Date;
  createdBy: mongoose.Types.ObjectId;
  usageLimit: number;
  usageCount: number;
}

const CouponSchema = new mongoose.Schema<ICoupon>({
  code: { type: String, unique: true },
  discountPercentage: Number,
  validFrom: Date,
  validUntil: Date,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "StudentPartner" },
  usageLimit: Number,
  usageCount: { type: Number, default: 0 },
});

export const Coupon: Model<ICoupon> =
  mongoose.models.Coupon || mongoose.model<ICoupon>("Coupon", CouponSchema);
