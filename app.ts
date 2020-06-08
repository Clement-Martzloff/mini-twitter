import express from 'express';
import morgan from 'morgan';
import path from 'path';
import './src/infrastructure/mongoDB.connection';
import { router as routes } from './src/application/routes';
const app = express();
const port = process.env.PORT || 3000;

console.log(process.env.NODE_ENV);

app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'pug');

app.use(morgan('short'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.listen(port);
