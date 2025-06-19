const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const db = require("../models");
const User = db.User;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        process.env.GOOGLE_CALLBACK_URL ||
        "http://localhost:5000/auth/google/callback",
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        console.log("Google Strategy - Received profile:", profile.id);
        let user = await User.findOne({ where: { googleId: profile.id } });

        if (!user) {
          user = await User.findOne({
            where: { email: profile.emails[0].value },
          });

          if (user) {
            user.googleId = profile.id;
            user.provider = "google";
            await user.save();
            console.log("Existing user updated with Google ID");
          } else {
            const code =
              createRandomString(3) +
              extractCharact(profile.emails[0].value) +
              createRandomString(3);
            user = await User.create({
              googleId: profile.id,
              email: profile.emails[0].value,
              firstName:
                profile.name.givenName || profile.displayName.split(" ")[0],
              lastName:
                profile.name.familyName ||
                profile.displayName.split(" ")[1] ||
                "",
              provider: "google",
              password: null,
              code: code,
            });
            console.log("New user created from Google");
          }
        }
        console.log("Authenticated user:", user.id);
        return done(null, user);
      } catch (error) {
        console.error("Error in Google Strategy:", error);
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  console.log("Serializing user:", user.id);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    console.log("Deserializing user:", user ? user.id : "not found");
    done(null, user);
  } catch (error) {
    console.error("Error deserializing user:", error);
    done(error, null);
  }
});

function createRandomString(length) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function extractCharact(email) {
  const characters = email.substring(0, 3);
  return characters;
}

module.exports = passport;
