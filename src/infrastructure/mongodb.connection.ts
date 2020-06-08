import { connect } from 'mongoose';

async function main(): Promise<void> {
  try {
    await connect(
      'mongodb+srv://dbAdmin:qwe@cluster0-mkbwe.mongodb.net/twitter?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log('connection ok !');
  } catch (error) {
    console.log(error);
  }
}

main();
