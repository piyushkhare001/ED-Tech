import mongoose, { Model } from "mongoose";

export interface Ilecture {
  type: string;
  title: string;
  hidden: boolean;
  description?: string;
  thumbnail?: string;
  createdAt: Date;
  video?: string;
  status?:string;
  // comments: mongoose.Types.ObjectId[];
}

const LectureSchema = new mongoose.Schema<Ilecture>({
  type: { type: String, default: "page" },
  title: { type: String }, // Mark title as required
  hidden: { type: Boolean, default: false },
  description: { type: String },
  thumbnail: { type: String },
  createdAt: { type: Date, default: Date.now },
  video: { type: String},
  // comments: { type: [mongoose.Schema.Types.ObjectId], ref: "Comment", default: [] } // Default to empty array
});

// Correct model name to 'Lecture'
export const Lecture: Model<Ilecture> =
  mongoose.models.Lecture || mongoose.model<Ilecture>("Lecture", LectureSchema);
