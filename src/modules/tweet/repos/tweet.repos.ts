import tweetModel from '../../../infra/mongoose/models/tweet.model';
import { Tweet, TweetProps } from '../domain/tweet.domain';
import { User } from '../../user/domain/user.domain';
import { toDomain, toMongoose } from '../mappers/tweet.mapper';

/* --------------------------------- QUERIES ------------------------------- */

export const getAllTweets = async (): Promise<Tweet[]> => {
  const tweetDocuments = await tweetModel.find().exec();

  return tweetDocuments.map((tweetDocument) => toDomain(tweetDocument));
};

export const getTweet = async (tweetId: string): Promise<Tweet> => {
  const tweetDocument = await tweetModel.findOne({ _id: tweetId }).exec();

  return toDomain(tweetDocument);
};

export const getTweetsByAuthor = async (authorId: string): Promise<Tweet[]> => {
  const tweetDocuments = await tweetModel.find({ authorId }).exec();

  return tweetDocuments.map((tweetDocument) => toDomain(tweetDocument));
};

export const getTweetsWithAuthorByFollowings = async (
  user: User
): Promise<Tweet[]> => {
  const tweetDocuments = await tweetModel
    .find({
      authorId: { $in: [user.followings] },
    })
    .populate('author')
    .exec();

  return tweetDocuments.map((tweetDocument) => toDomain(tweetDocument));
};

/* -------------------------------- COMMANDS -------------------------------- */

export const save = async (tweet: Tweet): Promise<void> => {
  const rawTweet = toMongoose(tweet);

  await tweetModel.create(rawTweet);
};

export const deleteTweet = async (tweetId: string): Promise<void> => {
  await tweetModel.findByIdAndDelete(tweetId).exec();
};

export const updateTweet = async (
  tweetId: string,
  props: TweetProps
): Promise<void> => {
  await tweetModel
    .findByIdAndUpdate(tweetId, { $set: props }, { runValidators: true })
    .exec();
};
