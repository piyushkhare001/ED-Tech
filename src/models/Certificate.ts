import mongoose, { Model } from "mongoose";
export interface ICertificate {
  slug: string;
  user: mongoose.Types.ObjectId;
  course: mongoose.Types.ObjectId;
}

const CertificateSchema = new mongoose.Schema<ICertificate>({
  slug: { type: String, default: "certId" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
});

export const Certificate: Model<ICertificate> =
  mongoose.models.Certificate ||
  mongoose.model<ICertificate>("Certificate", CertificateSchema);
