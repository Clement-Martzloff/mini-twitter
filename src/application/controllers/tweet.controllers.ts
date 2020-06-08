import { Request, Response, NextFunction } from 'express';
import {
  createTweet,
  getAllTweets,
  deleteTweet,
  getTweet,
  updateTweet,
} from '../../infrastructure/repositories/mongoDB.tweet.repository';
import { TweetProps } from '../../domain/tweet.domain';

export const tweetList = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const documents = await getAllTweets();

    res.render('tweets/tweet', { tweets: documents });
  } catch (error) {
    next(error);
  }
};

export const tweetNew = (_: Request, res: Response) =>
  res.render('tweets/tweet-form', { tweet: {} });

export const tweetCreate = async (req: Request, res: Response) => {
  const body: TweetProps = req.body;

  try {
    await createTweet(body);
    res.redirect('/tweets');
  } catch (error) {
    const errors = Object.keys(error.errors).map(
      (key) => error.errors[key].message
    );

    res.status(400).render('tweets/tweet-form', { errors });
  }
};

export const tweetDelete = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const tweetId = req.params.tweetId;

  try {
    await deleteTweet(tweetId);

    const documents = await getAllTweets();

    res.render('tweets/tweet-list', { tweets: documents });
  } catch (error) {
    next(error);
  }
};

export const tweetEdit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const tweetId = req.params.tweetId;

  try {
    const document = await getTweet(tweetId);

    res.render('tweets/tweet-form', { tweet: document });
  } catch (error) {
    next(error);
  }
};

export const tweetUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const tweetId = req.params.tweetId;
  const body = req.body;

  try {
    await updateTweet(tweetId, body);
    res.redirect('/tweets');
  } catch (error) {
    const errors = Object.keys(error.errors).map(
      (key) => error.errors[key].message
    );
    const document = await getTweet(tweetId);

    res.status(400).render('tweets/tweet-form', { errors, tweet: document });
  }
};
