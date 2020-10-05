import mongoose, { Document } from 'mongoose';
import { IGroup } from './Group';

export interface IUser extends Document {
  _id: string | number;
  created: number;
  username: string;
  name: string;
  observableGroups: IGroup[];
  lastActivity: number;
  totalGroups: number,
  language: 'en' | 'ru';
  totalMovies: number;
}

export const UserSchema = new mongoose.Schema(
  {
    _id: String || Number,
    created: Number,
    username: String,
    name: String,
    observableGroups: [
      {
        type: String,
        ref: 'Group',
      },
    ],
    lastActivity: Number,
    totalGroups: Number,
    language: String,
  },
  { _id: false },
);

UserSchema.pre('find', function () {
  this.populate('observableGroups');
}).pre('findOne', function () {
  this.populate('observableGroups');
});

const User = mongoose.model<IUser>('User', UserSchema);
export default User;
