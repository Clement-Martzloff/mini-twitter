import { Request, Response, NextFunction } from 'express';
import {
  createTweet,
  getAllTweets,
  deleteTweet,
  getTweet,
  updateTweet,
} from '../../infrastructure/repositories/mongodb.tweet.repository';
import { TweetProps } from '../../domain/tweet.domain';
import { User } from '../../domain/user.domain';

export const tweetList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const documents = await getAllTweets();

    res.render('tweets/tweet', {
      tweets: documents,
      isAuthenticated: req.isAuthenticated(),
      currentUser: req.user,
    });
  } catch (error) {
    next(error);
  }
};

export const tweetNew = (req: Request, res: Response) =>
  res.render('tweets/tweet-form', {
    tweet: {},
    isAuthenticated: req.isAuthenticated(),
    currentUser: req.user,
  });

export const tweetCreate = async (req: Request, res: Response) => {
  const body: TweetProps = req.body;
  const user = req.user! as User;

  try {
    await createTweet({ ...body, authorId: user._id });
    res.redirect('/');
  } catch (error) {
    const errors = Object.keys(error.errors).map(
      (key) => error.errors[key].message
    );

    res.status(400).render('tweets/tweet-form', {
      errors,
      tweet: {},
      isAuthenticated: req.isAuthenticated(),
      currentUser: req.user,
    });
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

    res.render('tweets/tweet-form', {
      tweet: document,
      isAuthenticated: req.isAuthenticated(),
      currentUser: req.user,
    });
  } catch (error) {
    next(error);
  }
};

export const tweetUpdate = async (req: Request, res: Response) => {
  const tweetId = req.params.tweetId;
  const body = req.body;

  try {
    await updateTweet(tweetId, body);
    res.redirect('/');
  } catch (error) {
    const errors = Object.keys(error.errors).map(
      (key) => error.errors[key].message
    );
    const document = await getTweet(tweetId);

    res.status(400).render('tweets/tweet-form', {
      errors,
      tweet: document,
      isAuthenticated: req.isAuthenticated(),
      currentUser: req.user,
    });
  }
};
