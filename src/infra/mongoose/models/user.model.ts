import { model, Schema } from 'mongoose';

export const userschema = {
  username: { type: String, required: true, unique: true },
  local: {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  avatar: { type: String, default: '/images/default-avatar.png' },
  followings: [{ type: Schema.Types.ObjectId, ref: 'user' }],
};

const userModel = model('user', new Schema(userschema));

export default userModel;
