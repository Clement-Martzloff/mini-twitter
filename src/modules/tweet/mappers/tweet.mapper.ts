import { Tweet, create } from '../domain/tweet.domain';
import * as userMapper from '../../user/mappers/user.mapper';

export const toDomain = (raw: any): Tweet => {
  return create(
    {
      content: raw.content,
      author:
        typeof raw.author === 'string'
          ? raw.author
          : userMapper.toDomain(raw.author),
    },
    raw._id
  );
};

export const toMongoose = (tweet: Tweet): any => ({
  content: tweet.content,
  author: tweet.author,
});
