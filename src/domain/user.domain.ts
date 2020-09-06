import bcrypt from 'bcrypt';
import { uuid } from 'uuidv4';

export interface User {
  id: string;
  username: string;
  local: {
    email: string;
    password: string;
  };
  avatar?: string;
  setAvatar(filename: string): void;
}

export interface UserProps {
  username: string;
  email: string;
  password: string;
  avatar?: string;
}

export const create = (props: UserProps, id?: string): User => {
  const { email, password, ...rest } = props;

  return {
    id: id ? id : uuid(),
    local: { email, password },
    ...rest,
    setAvatar(filename) {
      this.avatar = filename;
    },
  };
};

export const hashPassword = (password: string) => bcrypt.hash(password, 12);

export const comparePassword = (password: string, hashedPassword: string) =>
  bcrypt.compare(password, hashedPassword);
