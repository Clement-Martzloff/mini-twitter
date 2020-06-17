import { Request, Response } from 'express';
import { createUser } from '../../infrastructure/repositories/mongodb.user.repository';

export const signUpForm = async (req: Request, res: Response) => {
  res.render('users/user-form', {
    errors: null,
    isAuthenticated: req.isAuthenticated(),
    currentUser: req.user,
  });
};

export const signUp = async (req: Request, res: Response) => {
  try {
    const user = await createUser(req.body);

    res.redirect('/');
  } catch (error) {
    res.render('users/user-form', {
      errors: [error.message],
      isAuthenticated: req.isAuthenticated(),
      currentUser: req.user,
    });
  }
};
