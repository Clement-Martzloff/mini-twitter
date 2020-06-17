import bcrypt from 'bcrypt';

export interface User {
  _id: string;
  username: string;
  local: {
    email: string;
    password: string;
  };
}

export interface UserProps {
  username: string;
  email: string;
  password: string;
}

export const hashPassword = (password: string) => bcrypt.hash(password, 12);

export const comparePassword = (password: string, hashedPassword: string) =>
  bcrypt.compare(password, hashedPassword);
