import userModel from '../../../infra/mongoose/models/user.model';
import { User } from '../domain/user.domain';
import { toDomain, toMongoose } from '../mappers/user.mapper';

const exists = async (email: string): Promise<boolean> => {
  const found = await userModel.findOne({ 'local.email': email }).exec();

  return found !== null;
};

/* --------------------------------- QUERIES -------------------------------- */

export const findUserByEmail = async (email: string): Promise<User> => {
  const userDocument = await userModel.findOne({ 'local.email': email }).exec();

  return toDomain(userDocument);
};

export const findUserById = async (id: string): Promise<User> => {
  const userDocument = await userModel.findById(id).exec();

  return toDomain(userDocument);
};

/* -------------------------------- COMMANDS -------------------------------- */

export const save = async (user: User): Promise<void> => {
  try {
    const rawUser = toMongoose(user);
    const userExists = await exists(user.local.email);

    if (!userExists) {
      await userModel.create(rawUser);
    } else {
      const userDocument = await userModel
        .findOne({ 'local.email': user.local.email })
        .exec();

      await userDocument!.update(rawUser).exec();
    }
  } catch (error) {
    throw error;
  }
};
