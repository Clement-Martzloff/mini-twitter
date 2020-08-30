import { Request, Response, NextFunction } from 'express';
import path from 'path';
import multer, { diskStorage } from 'multer';
import { createUser } from '../../infrastructure/repositories/mongodb.user.repository';
import { IMongooseDocWithUserProps } from '../../infrastructure/mongoose.adapters/user.adapter';

const upload = multer({
  storage: diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../public/images/avatars'));
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

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

export const uploadImage = [
  upload.single('avatar'),
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user! as IMongooseDocWithUserProps;

    user.avatar = req.file.filename;
    user.save();
    res.end();
  },
];
