import { Request, Response, NextFunction } from 'express';

export const ensureAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/auth/signin/form');
  }
};

export const ensureSecure = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.secure) {
    // OK, continue
    return next();
  }
  // handle port numbers if you need non defaults
  // res.redirect('https://' + req.host + req.url); // express 3.x
  res.redirect(`https://${req.hostname}${req.url}`); // express 4.x
};
