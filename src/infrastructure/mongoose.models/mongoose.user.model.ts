import { model } from 'mongoose';
import mongooseUserSchema from '../../domain/validators/mongoose.user.schema';

const mongooseUserModel = model('tweet', mongooseUserSchema);

export default mongooseUserModel;
