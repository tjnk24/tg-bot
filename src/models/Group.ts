import mongoose, { Document } from 'mongoose';

export interface IGroup extends Document {
  _id: string;
  title: string;
  url: string;
}

export const GroupSchema = new mongoose.Schema(
  {
    _id: String,
    title: String,
    url: String,
  },
);

const Group = mongoose.model<IGroup>('Group', GroupSchema);

export default Group;
