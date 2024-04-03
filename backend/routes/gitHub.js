const express = require("express");
const gitHubRouter = express.Router();
const strategy = require("passport-github2").Strategy;
const passport = require("passport");
const session = require("express-session");
const jwt = require("jsonwebtoken");

require("dotenv").config();

gitHubRouter.use(
  session({
    secret: process.env.GITHUB_CLIENT_SECRET, //! Chiave segreta utilizzata per firmare una sessione.
    resave: false, //! Resave indica se la sessione deve essere salvata anche se la richiesta non è stata modificata.
    saveUninitialized: false, // ! SaveInitialized indica che la sessione deve essere salvata anche se vuota.
  })
);

passport.use(passport.initialize());
passport.use(passport.session());
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new strategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHHUB_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
        console.log(profile);
      return done(null, profile);
    }
  )
);

gitHubRouter.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  (request, response) => {
    const user = request.user;
    const redirectUrl = `http://localhost:3000/success?user=${JSON.stringify(
      user
    )}`;
    response.redirect(redirectUrl);
  }
);

gitHubRouter.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  (request, response) => {
    const user = request.user;
    const token = jwt.sign(user, process.env.SECRET_KEY);

    const redirectUrl = `http://localhost:3000/success?token=${token}`;
    response.redirect(redirectUrl);
  }
);

gitHubRouter.get("/success", (request, response) => {
  response.redirect("/home");
});

module.exports = gitHubRouter;
