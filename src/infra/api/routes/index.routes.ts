import { Router, Request, Response } from 'express';
import {
  ensureSecure,
  ensureAuthenticated,
} from '../middlewares/guard.middleware';
import { router as tweetRouter } from './tweet.routes';
import { router as userRouter } from './user.routes';
import { router as authRouter } from './auth.routes';

const router = Router();

router.get('*', ensureSecure);
router.get('/', (_: Request, res: Response) => res.redirect('/tweets'));

router.use('/tweets', ensureAuthenticated, tweetRouter);
router.use('/users', userRouter);
router.use('/auth', authRouter);

export { router };
