import { connect } from 'mongoose';
import { environment } from '../../env';

connect(environment.dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

console.log('connection ok !');
