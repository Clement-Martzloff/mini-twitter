import { connect } from 'mongoose';

connect(
  'mongodb+srv://dbAdmin:qwe@cluster0-mkbwe.mongodb.net/twitter?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

console.log('connection ok !');
