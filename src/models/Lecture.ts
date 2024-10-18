import mongoose, { Model } from "mongoose";

export interface Ilecture {
  type: string;
  title: string;
  hidden: boolean;
  description?: string;
  thumbnail?: string;
  parentId?: mongoose.Types.ObjectId | null; // Allow null if parentId is not set
  children: mongoose.Types.ObjectId[];
  createdAt: Date;
  video?: string;
  // comments: mongoose.Types.ObjectId[];
}

const LectureSchema = new mongoose.Schema<Ilecture>({
  type: { type: String, default: "folder" },
  title: { type: String, required: true }, // Mark title as required
  hidden: { type: Boolean, default: false },
  description: { type: String },
  thumbnail: { type: String },
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: "Lecture", default: null },
  children: { type: [mongoose.Schema.Types.ObjectId], ref: "Lecture", default: [] }, // Default to empty array
  createdAt: { type: Date, default: Date.now },
  video: { type: String},
  // comments: { type: [mongoose.Schema.Types.ObjectId], ref: "Comment", default: [] } // Default to empty array
});

// Correct model name to 'Lecture'
export const Lecture: Model<Ilecture> =
  mongoose.models.Lecture || mongoose.model<Ilecture>("Lecture", LectureSchema);
