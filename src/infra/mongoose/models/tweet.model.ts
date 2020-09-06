import { model, Schema } from 'mongoose';

const tweetSchema = {
  content: {
    type: String,
    maxlength: [140, 'Tweet trop long'],
    minlength: [1, 'Tweet trop court'],
    required: [true, 'Champ requis'],
  },
  authorId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
};

const tweetModel = model('tweet', new Schema(tweetSchema));

export default tweetModel;
