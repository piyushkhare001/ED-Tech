import mongoose, { Model } from "mongoose";
export interface IVideoProgress {
  user: mongoose.Types.ObjectId;
  content: mongoose.Types.ObjectId;
  currentTimestamp: number;
  markAsCompleted: boolean;
  updatedAt: Date;
}

const VideoProgressSchema = new mongoose.Schema<IVideoProgress>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  content: { type: mongoose.Schema.Types.ObjectId, ref: "Content" },
  currentTimestamp: Number,
  markAsCompleted: { type: Boolean, default: false },
  updatedAt: { type: Date, default: Date.now },
});

export const VideoProgress: Model<IVideoProgress> =
  mongoose.models.VideoProgress ||
  mongoose.model<IVideoProgress>("VideoProgress", VideoProgressSchema);
