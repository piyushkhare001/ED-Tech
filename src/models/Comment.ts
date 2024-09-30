import mongoose, { Model } from "mongoose";
export interface IComment {
  content: string;
  approved: boolean;
  commentedOn: mongoose.Types.ObjectId;
  parent?: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  upvotes: number;
  downvotes: number;
  repliesCount: number;
  createdAt: Date;
  updatedAt: Date;
  isPinned: boolean;
}

const CommentSchema = new mongoose.Schema<IComment>({
  content: String,
  approved: { type: Boolean, default: false },
  commentedOn: { type: mongoose.Schema.Types.ObjectId, ref: "Content" },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  repliesCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isPinned: { type: Boolean, default: false },
});

export const Comment: Model<IComment> =
  mongoose.models.Comment || mongoose.model<IComment>("Comment", CommentSchema);
