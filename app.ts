import express, { Request, Response } from 'express';
import morgan from 'morgan';
import path from 'path';
import errorhandler from 'errorhandler';
import './src/infrastructure/mongodb.connection';
import { router as allRoutes } from './src/application/routes/all.routes';

export { app };

const app = express();
const port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'pug');

app.use(morgan('short'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(allRoutes);

if (process.env.NODE_ENV === 'development') {
  app.use(errorhandler);
} else {
  app.use((err: any, _: Request, res: Response) => {
    const code = err.code || 500;

    res.status(code).json({ code, messge: code === 500 ? null : err.message });
  });
}

app.listen(port);
