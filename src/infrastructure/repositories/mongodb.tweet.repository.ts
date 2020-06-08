import mongooseTweetModel from '../mongoose.models/mongoose.tweet.model';
import { TweetProps } from '../../domain/tweet.domain';

export const getAllTweets = () => mongooseTweetModel.find().exec();

export const createTweet = (body: TweetProps) =>
  mongooseTweetModel.create(body);

export const deleteTweet = (tweetId: string) =>
  mongooseTweetModel.findByIdAndDelete(tweetId);

export const getTweet = (tweetId: string) =>
  mongooseTweetModel.findOne({ _id: tweetId }).exec();

export const updateTweet = (tweetId: string, body: TweetProps) =>
  mongooseTweetModel.findByIdAndUpdate(
    tweetId,
    { $set: body },
    { runValidators: true }
  );
