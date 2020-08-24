import passport from 'passport';
import app from '../../app';
import { Strategy } from 'passport-local';
import {
  findUserByEmail,
  findUserById,
} from '../../infrastructure/repositories/mongodb.user.repository';
import { comparePassword } from '../../domain/user.domain';

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user: any, done) => done(null, user._id));
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
          const match = await comparePassword(
            password,
            user.get('local.password'),
          );

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
    },
  ),
);
