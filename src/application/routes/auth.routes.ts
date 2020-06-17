import { Router } from 'express';
import { signInForm, signIn, signOut } from '../controllers/auth.controller';

const router = Router();

router.get('/signin/form', signInForm);
router.post('/signin', signIn);
router.get('/signout', signOut);

export { router };
