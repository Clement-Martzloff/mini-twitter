import { config } from 'dotenv';
config();
import express, { Request, Response } from 'express';

const app = express();
export default app;

import morgan from 'morgan';
import path from 'path';
import errorhandler from 'errorhandler';

import { router as indexRoutes } from './src/application/routes/index.routes';

// import './src/infrastructure/mongodb.connection'
import './src/config/session.config';
import './src/config/passport.config';

app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'pug');

app.use(morgan('short'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(indexRoutes);

if (process.env.NODE_ENV === 'development') {
  app.use(errorhandler);
} else {
  app.use((err: any, _: Request, res: Response) => {
    const code = err.code || 500;

    res.status(code).json({ code, messge: code === 500 ? null : err.message });
  });
}
