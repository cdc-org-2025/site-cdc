import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import dotenv from 'dotenv'
dotenv.config()

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.BASE_URL}/admin/auth/google/callback`,
  }, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
  }));
} else {
  console.warn('⚠️ Google OAuth não configurado (GOOGLE_CLIENT_ID ausente). Login via Google desativado no ambiente local.');
}

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

export default passport
