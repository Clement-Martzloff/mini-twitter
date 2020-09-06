import { Router } from 'express';
import {
  signUp,
  signUpForm,
  uploadImage,
} from '../../../modules/user/controllers/user.controller';
import { ensureAuthenticated } from '../middlewares/guard.middleware';

const router = Router();

router.get('/signup/form', signUpForm);
router.post('/signup', signUp);
router.post('/update/image', ensureAuthenticated, uploadImage);

export { router };
