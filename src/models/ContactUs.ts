
import mongoose, { Schema, Document } from 'mongoose';

export interface ContactUs extends Document {
  name: string;
  email: string;
  message: string;
  mobileNo : number;
  accountType : string
}

const ContactUsSchema: Schema = new Schema({
  name: { type: String, required: true },

  email: { type: String, required: true },

  message: { type: String, required: true },
    
  mobileNo: { type: Number, required: true },

  accountType : {  type  : String , required : true},

});

export default mongoose.models.Request || mongoose.model<ContactUs>('ContactUs', ContactUsSchema);
