import { model, Schema } from 'mongoose';

const mongooseTweetSchema = {
  content: {
    type: String,
    maxlength: [140, 'Tweet trop long'],
    minlength: [1, 'Tweet trop court'],
    required: [true, 'Champ requis'],
  },
  author: { type: Schema.Types.ObjectId, ref: 'user', required: true },
};

const mongooseTweetModel = model('tweet', new Schema(mongooseTweetSchema));

export default mongooseTweetModel;
