import { Router } from 'express';
import { router as tweets } from './tweets';

const router = Router();

router.use('/tweets', tweets);

export { router };
