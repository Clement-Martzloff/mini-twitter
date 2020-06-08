import { Schema } from 'mongoose';

const mongooseTweetSchema = new Schema({
  content: {
    type: String,
    maxlength: [140, 'Tweet trop long'],
    minlength: [1, 'Tweet trop court'],
    required: [true, 'Champ requis'],
  },
});

export default mongooseTweetSchema;
