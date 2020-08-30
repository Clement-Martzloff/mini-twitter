import { User } from '../../domain/user.domain';
import { Document } from 'mongoose';

export interface IMongooseDocWithUserProps extends Document, User {
  _id: any;
}
