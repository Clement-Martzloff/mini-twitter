import { Router } from 'express';
import { signUp, signUpForm } from '../controllers/user.controller';

const router = Router();

router.get('/signup/form', signUpForm);
router.post('/signup', signUp);

export { router };
