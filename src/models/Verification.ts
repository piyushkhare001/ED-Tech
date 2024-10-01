import mongoose, { Schema, Document } from 'mongoose';

export interface IVerification extends Document {
  email: string;
  otp: string;
  otpExpiresAt: Date;
  verified: boolean;
}

const VerificationSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  otp: { type: String, required: true },
  otpExpiresAt: { type: Date, required: true }, // Expiry time for the OTP
  verified: { type: Boolean, default: false },
});

export default mongoose.models.Verification || mongoose.model<IVerification>('Verification', VerificationSchema);