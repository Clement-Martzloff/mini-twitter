import { connect } from 'mongoose';
const uri: string = process.env.MONGO_CONNECTION_URI!;

connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

console.log('connection ok !');
