import mongoose, { Model } from "mongoose";

export interface IOrganization {
  name?: string;
  email: string;
  password: string;

  otp?: string;
  otpExpiresAt?: Date;
  position: string;
  collegeName: string;
  coupons: mongoose.Types.ObjectId[];
  resetPasswordToken?: string;
  resetPasswordExpiresAt?: Date;
}

const OrganizationSchema = new mongoose.Schema<IOrganization>({
  name: { type: String },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  position: { type: String, required: true },
  resetPasswordToken: { type: String },
  resetPasswordExpiresAt: { type: Date },
  collegeName: { type: String },
  otp: { type: String },
  otpExpiresAt: { type: Date },
});

// Use type assertion to ensure the model has the correct type
export const Organization: Model<IOrganization> =
  (mongoose.models.Organization as Model<IOrganization>) ||
  mongoose.model<IOrganization>("Organization", OrganizationSchema);

export default Organization;
