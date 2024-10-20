
import mongoose, { Document, Model } from 'mongoose';


interface IPurchase extends Document {
  buyerId: mongoose.Schema.Types.ObjectId; 
  courseId: mongoose.Schema.Types.ObjectId; 
   studentPartnerId: mongoose.Schema.Types.ObjectId; 
  finalPrice: number; 
  purchaseDate: Date; 
  paymentId: string; 
}


const PurchaseSchema = new mongoose.Schema<IPurchase>({
  buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  studentPartnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'StudentPartner' },
  finalPrice: { type: Number },
  purchaseDate: { type: Date, default: Date.now },
  paymentId: { type: String, required: true },
});


const Purchase: Model<IPurchase> = mongoose.models.Purchase || mongoose.model<IPurchase>('Purchase', PurchaseSchema);

export default Purchase;
