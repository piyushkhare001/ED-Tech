import mongoose, { Document, Schema } from 'mongoose';

// Define the profile document interface
export interface IProfile extends Document {
  user: mongoose.Schema.Types.ObjectId;
  
  dateOfBirth: Date;
  gender: 'male' | 'female' | 'other';
  mobile: string;
  about?: string;
  address?: string;
  collageName?: string;
  createdAt: Date;
}

// Define the schema for the Profile model
const ProfileSchema = new Schema<IProfile>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true
  },

  dateOfBirth: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true
  },
  mobile: {
    type: String,
    required: true,
    unique: true
  },
  about: {
    type: String,
    maxlength: 500
  },
  address: {
    type: String,
    maxlength: 200
  },
  collageName: {
    type: String,
    maxlength: 100
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Export the Profile model
const Profile = mongoose.models.Profile || mongoose.model<IProfile>('Profile', ProfileSchema);

export default Profile;
