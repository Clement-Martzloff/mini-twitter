import { Request, Response, NextFunction } from 'express';
import {
  save,
  getAllTweets,
  deleteTweet,
  getTweet,
  updateTweet,
} from '../repos/tweet.repos';
import { create } from '../domain/tweet.domain';
import { User } from '../../user/domain/user.domain';

export const tweetList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tweets = await getAllTweets();

    res.render('tweets/tweet', {
      tweets,
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
  const user = req.user! as User;
  const tweet = create({
    content: req.body.content,
    author: user.id,
  });

  try {
    await save(tweet);
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

    const tweets = await getAllTweets();

    res.render('tweets/tweet-list', { tweets });
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
    const tweet = await getTweet(tweetId);

    res.render('tweets/tweet-form', {
      tweet,
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
    const tweet = await getTweet(tweetId);

    res.status(400).render('tweets/tweet-form', {
      errors,
      tweet,
      isAuthenticated: req.isAuthenticated(),
      currentUser: req.user,
    });
  }
};
