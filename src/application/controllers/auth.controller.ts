import { Request, Response, NextFunction } from 'express';
import passport from 'passport';

export const signInForm = (req: Request, res: Response) => {
  res.render('auth/auth-form', {
    errors: null,
    isAuthenticated: req.isAuthenticated(),
    currentUser: req.user,
  });
};

export const signIn = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {
      next(authError);
    } else if (!user) {
      res.render('auth/auth-form', {
        errors: [info.message],
        isAuthenticated: req.isAuthenticated(),
        currentUser: req.user,
      });
    } else {
      req.login(user, (loginError) => {
        if (loginError) {
          next(loginError);
        } else {
          res.redirect('/tweets');
        }
      });
    }
  })(req, res, next);
};

export const signOut = (req: Request, res: Response) => {
  console.log(req);
  req.logout();
  res.redirect('/auth/signin/form');
};
