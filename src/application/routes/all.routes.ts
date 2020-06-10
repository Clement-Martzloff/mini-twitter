import { Router } from 'express';
import { router as tweetRouter } from './tweet.routes';
import { router as userRouter } from './user.routes';

const router = Router();

router.use('/tweets', tweetRouter);
router.use('/users', userRouter);

export { router };
