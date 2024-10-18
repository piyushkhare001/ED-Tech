import mongoose, { Model } from "mongoose";
export interface IVideoMetadata {
  contentId: mongoose.Types.ObjectId;
  video_1080p_mp4: string[];
  video_720p_mp4: string[];
  video_360p_mp4: string[];
  subtitles?: string;
  subtitle_tried: number;
  segments?: any;
  slides?: string;
  thumbnail_mosaic_url?: string;
  duration?: number;
  migration_status:
    | "NOT_MIGRATED"
    | "IN_PROGRESS"
    | "MIGRATED"
    | "MIGRATION_ERROR";
  migration_pickup_time?: Date;
  original_mp4_url?: string;
  transcoded: boolean;
}

const VideoMetadataSchema = new mongoose.Schema<IVideoMetadata>({
  video_1080p_mp4: [String],
  video_720p_mp4: [String],
  video_360p_mp4: [String],
  subtitles: String,
  subtitle_tried: { type: Number, default: 0 },
  segments: mongoose.Schema.Types.Mixed,
  slides: String,
  thumbnail_mosaic_url: String,
  duration: Number,
  migration_status: {
    type: String,
    enum: ["NOT_MIGRATED", "IN_PROGRESS", "MIGRATED", "MIGRATION_ERROR"],
    default: "NOT_MIGRATED",
  },
  migration_pickup_time: Date,
  original_mp4_url: String,
  transcoded: { type: Boolean, default: false },
});

export const VideoMetadata: Model<IVideoMetadata> =
  mongoose.models.VideoMetadata ||
  mongoose.model<IVideoMetadata>("VideoMetadata", VideoMetadataSchema);
