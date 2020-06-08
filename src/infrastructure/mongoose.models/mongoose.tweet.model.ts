import { model } from 'mongoose';
import mongooseTweetSchema from '../../domain/validators/mongoose.tweet.schema';

const mongooseTweetModel = model('tweet', mongooseTweetSchema);

export default mongooseTweetModel;
