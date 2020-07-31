import { connect } from 'mongoose';
const environment = require(`../environment/${process.env.NODE_ENV}`);

connect(environment.dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

console.log('connection ok !');
