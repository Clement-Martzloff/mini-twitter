import { Router } from 'express';
import {
  tweetList,
  tweetCreate,
  tweetNew,
  tweetDelete,
  tweetEdit,
  tweetUpdate,
} from '../controllers/tweet.controller';

const router = Router();

router.get('/', tweetList);
router.post('/', tweetCreate);
router.get('/new', tweetNew);
router.get('/edit/:tweetId', tweetEdit);
router.post('/update/:tweetId', tweetUpdate);
router.delete('/:tweetId', tweetDelete);

export { router };
