import mongooseUserModel from '../../infrastructure/mongoose.models/mongoose.user.model';
import { UserProps, hashPassword } from '../../domain/user.domain';

export const createUser = async (user: UserProps) => {
  try {
    const hashedPassword = await hashPassword(user.password);

    return mongooseUserModel.create({
      username: user.username,
      local: {
        email: user.email,
        password: hashedPassword,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const findUserByEmail = (email: string) =>
  mongooseUserModel.findOne({ 'local.email': email }).exec();

export const findUserById = (id: string) =>
  mongooseUserModel.findById(id).exec();
