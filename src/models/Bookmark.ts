import mongoose, { Model } from "mongoose";
export interface IBookmark {
  user: mongoose.Types.ObjectId;
  content: mongoose.Types.ObjectId;
  createdAt: Date;
}

const BookmarkSchema = new mongoose.Schema<IBookmark>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  content: { type: mongoose.Schema.Types.ObjectId, ref: "Content" },
  createdAt: { type: Date, default: Date.now },
});

export const Bookmark: Model<IBookmark> =
  mongoose.models.Bookmark ||
  mongoose.model<IBookmark>("Bookmark", BookmarkSchema);
