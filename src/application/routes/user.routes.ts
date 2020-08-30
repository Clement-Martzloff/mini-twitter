import { Router } from 'express';
import {
  signUp,
  signUpForm,
  uploadImage,
} from '../controllers/user.controller';
import { ensureAuthenticated } from '../../config/guards';

const router = Router();

router.get('/signup/form', signUpForm);
router.post('/signup', signUp);
router.post('/update/image', ensureAuthenticated, uploadImage);

export { router };
