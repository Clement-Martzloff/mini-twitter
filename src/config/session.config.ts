import { app } from '../../app';
import expressSession from 'express-session';
import connectMongo from 'connect-mongo';
const mongoStoreFactory = connectMongo(expressSession);
import { connection } from 'mongoose';

app.use(
  expressSession({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: false,
      maxAge: 1000 * 60 * 60 * 24 * 14,
    },
    store: new mongoStoreFactory({
      mongooseConnection: connection,
      ttl: 60 * 60 * 24 * 14,
    }),
  })
);
