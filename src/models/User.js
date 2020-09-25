import mongoose from 'mongoose';

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

const User = mongoose.model('User', UserSchema);
export default User;
