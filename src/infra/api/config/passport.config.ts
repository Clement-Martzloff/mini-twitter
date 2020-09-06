import passport from 'passport';
import app from '../app';
import { Strategy } from 'passport-local';
import {
  findUserByEmail,
  findUserById,
} from '../../../modules/user/repos/user.repo';
import {
  User,
  comparePassword,
} from '../../../modules/user/domain/user.domain';

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user: User, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await findUserById(id);

    done(null, user);
  } catch (error) {
    done(error);
  }
});

passport.use(
  'local',
  new Strategy(
    {
      usernameField: 'email',
    },
    async (email, password, done) => {
      try {
        const user = await findUserByEmail(email);

        if (user) {
          const match = await comparePassword(password, user.local.password);

          if (match) {
            done(null, user);
          } else {
            done(null, false, { message: 'Wrong password' });
          }
        } else {
          done(null, false, { message: 'User not found' });
        }
      } catch (error) {
        done(error);
      }
    }
  )
);
