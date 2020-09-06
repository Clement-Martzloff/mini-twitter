import { Tweet, create } from '../domain/tweet.domain';

export const toDomain = (raw: any): Tweet => {
  return create(
    {
      content: raw.content,
      authorId: raw.authorId,
    },
    raw._id
  );
};

export const toMongoose = (tweet: Tweet): any => ({
  content: tweet.content,
  authorId: tweet.authorId,
});
