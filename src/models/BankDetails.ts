import mongoose, { Schema, Document } from 'mongoose';

interface IBankDetails extends Document {
  studentPartnerId: mongoose.Types.ObjectId;
  accountHolderName: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  branchName: string;
  upiId: string;
  panCardNumber: string;
}


const BankDetailsSchema: Schema = new Schema({
  studentPartnerId: {
    type: Schema.Types.ObjectId,
    ref: 'StudentPartner',
    required: true
  },
  accountHolderName: {
    type: String,
    required: true,
    trim: true
  },
  bankName: {
    type: String,
    required: true,
    trim: true
  },
  accountNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  ifscCode: {
    type: String,
    required: true,
    trim: true,
    uppercase: true
  },
  branchName: {
    type: String,
    required: true,
    trim: true
  },
  upiId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  panCardNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    uppercase: true
  }
}, {
  timestamps: true
});


export default mongoose.model<IBankDetails>('BankDetails', BankDetailsSchema);