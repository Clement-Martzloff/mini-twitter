import { model, Schema } from 'mongoose';

export const mongooseUserschema = {
  username: { type: String, required: true, unique: true },
  local: {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  avatar: { type: String, default: '/images/default-avatar.png' },
};

const mongooseUserModel = model('user', new Schema(mongooseUserschema));

export default mongooseUserModel;
