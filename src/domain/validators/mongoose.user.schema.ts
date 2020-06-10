import { Schema } from 'mongoose';

const mongooseUserSchema = new Schema({
  username: { type: String, required: true },
  local: {
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
});

export default mongooseUserSchema;
