import mongoose, { Schema, Document } from "mongoose";

export interface ContactUs extends Document {
  name: string;
  email: string;
  message: string;
  mobileNo: string; // Changed to string
  accountType: string;
}

const ContactUsSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  mobileNo: { type: String, required: true }, // Changed to string
  accountType: { type: String },
});

// Check if the model already exists to avoid OverwriteModelError
const ContactUsModel =
  mongoose.models.ContactUs ||
  mongoose.model<ContactUs>("ContactUs", ContactUsSchema);

export default ContactUsModel;
