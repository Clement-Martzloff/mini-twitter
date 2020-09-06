import { uuid } from 'uuidv4';
import { User } from '../../user/domain/user.domain';

export interface Tweet {
  id: string;
  content: string;
  author: string | User;
}

export interface TweetProps {
  content: string;
  author: string;
}

export const create = (props: TweetProps, id?: string): Tweet => {
  return {
    id: id ? id : uuid(),
    ...props,
  };
};
