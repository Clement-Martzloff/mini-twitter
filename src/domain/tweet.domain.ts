import { uuid } from 'uuidv4';

export interface Tweet {
  id: string;
  content: string;
  authorId: string;
}

export interface TweetProps {
  content: string;
  authorId: string;
}

export const create = (props: TweetProps, id?: string) => {
  return {
    id: id ? id : uuid(),
    ...props,
  };
};
