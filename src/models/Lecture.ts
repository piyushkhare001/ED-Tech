import mongoose, { Model } from "mongoose";
export interface Ilecture {
  type: string;
  title: string;
  hidden: boolean;
  description?: string;
  thumbnail?: string;
  parentId?: mongoose.Types.ObjectId;
  children: mongoose.Types.ObjectId[];
  courses: mongoose.Types.ObjectId[];
  createdAt: Date;
  videoMetadata?: mongoose.Types.ObjectId;
  commentsCount: number;
}

const LectureSchema = new mongoose.Schema<Ilecture>({
  type: { type: String, default: "folder" },
  title: String,
  hidden: { type: Boolean, default: false },
  description: String,
  thumbnail: String,
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: "Content" },
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: "Content" }],
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  createdAt: { type: Date, default: Date.now },
  videoMetadata: { type: mongoose.Schema.Types.ObjectId, ref: "VideoMetadata" },
  commentsCount: { type: Number, default: 0 },
});

export const Lecture: Model<Ilecture> =
  mongoose.models.Lecture || mongoose.model<Ilecture>("Content", LectureSchema);
