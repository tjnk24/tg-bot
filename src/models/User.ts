import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
  _id: number;
  created: number;
  username: string;
  name: string;
  observableGroups: string[];
  lastActivity: number;
  language: 'en' | 'ru';
  totalMovies: number;
}

export const UserSchema = new mongoose.Schema(
  {
    _id: String,
    created: Number,
    username: String,
    name: String,
    observableGroups: [
      { type: String },
    ],
    lastActivity: Number,
    language: String,
  },
  { _id: false },
);

// UserSchema.pre('find', function () {
//   this.populate('observableGroups');
// }).pre('findOne', function () {
//   this.populate('observableGroups');
// });

const User = mongoose.model<IUser>('User', UserSchema);
export default User;
