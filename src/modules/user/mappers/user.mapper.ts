import { User, create } from '../domain/user.domain';

export const toDomain = (raw: any): User => {
  return create(
    {
      username: raw.username,
      email: raw.local.email,
      password: raw.local.password,
      avatar: raw.avatar,
    },
    raw._id
  );
};

export const toMongoose = (user: User): any => ({
  username: user.username,
  local: {
    email: user.local.email,
    password: user.local.password,
  },
  avatar: user.avatar,
});
