import mongooseUserModel from '../../infrastructure/mongoose.models/mongoose.user.model';
import { User } from '../../domain/user.domain';
import { toDomain, toMongoose } from '../../domain/user.mapper';

const exists = async (email: string): Promise<boolean> => {
  const found = await mongooseUserModel
    .findOne({ 'local.email': email })
    .exec();

  return found !== null;
};

/* --------------------------------- QUERIES -------------------------------- */

export const findUserByEmail = async (email: string): Promise<User> => {
  const userDocument = await mongooseUserModel
    .findOne({ 'local.email': email })
    .exec();

  return toDomain(userDocument);
};

export const findUserById = async (id: string): Promise<User> => {
  const userDocument = await mongooseUserModel.findById(id).exec();

  return toDomain(userDocument);
};

/* -------------------------------- COMMANDS -------------------------------- */

export const save = async (user: User): Promise<void> => {
  try {
    const rawUser = toMongoose(user);
    const userExists = await exists(user.local.email);

    if (!userExists) {
      await mongooseUserModel.create(rawUser);
    } else {
      const userDocument = await mongooseUserModel
        .findOne({ 'local.email': user.local.email })
        .exec();

      await userDocument!.update(rawUser).exec();
    }
  } catch (error) {
    throw error;
  }
};
