import { Request, Response } from 'express';
import path from 'path';
import multer, { diskStorage } from 'multer';
import { save } from '../repos/user.repo';
import { User, create, hashPassword } from '../domain/user.domain';

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
    const hashedPassword = await hashPassword(req.body.password);
    const user: User = create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    await save(user);
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
  async (req: Request, res: Response) => {
    const user = req.user! as User;

    user.setAvatar(req.file.filename);
    await save(user);
    res.end();
  },
];
