import { model, Schema } from 'mongoose';

const mongooseUserschema = {
  username: { type: String, required: true, unique: true },
  local: {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
};

const mongooseUserModel = model('user', new Schema(mongooseUserschema));

export default mongooseUserModel;
