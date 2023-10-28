// in plugins/passport.js

const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2').Strategy;
const axios = require('axios');

// Configure the OAuth2 strategy with Swarm API endpoint and client credentials
passport.use(new OAuth2Strategy({
    authorizationURL: 'https://foursquare.com/oauth2/authenticate',
    tokenURL: 'https://foursquare.com/oauth2/access_token',

    clientID: 'OUYWUC4AHY4VSFCWA0EB055U3V4A01WYGRSAZ0MXLS0JKCUA',
    clientSecret: 'DK3KXOIRRPM3CGGXUYHEDTPVJDDNPDGDE0GYHUBWRCPNQLAG',
    callbackURL: 'http://localhost:3000/auth/foursquare/callback',
    passReqToCallback: true

}, (accessToken, refreshToken, profile, done) => {
  // Custom function to handle Swarm OAuth2 callback response
  // Extract the access token and other information from the response and use it to authenticate the user
  axios.get(`https://swarmapi.com/oauth2/userinfo?access_token=${accessToken}`)
    .then(response => {
      const userData = response.data;
      // Authenticate user and call `done` with user object or error if failed
    })
    .catch(error => {
      console.error(error);
      done(error, null);
    });
}));

// Middleware function to check if user is authenticated
const requireAuth = (req, res, next) => {
  if (!req.isAuthenticated()) {
    // Display login modal to prompt user to authenticate with Swarm using OAuth2 strategy
    // You can use a library like Bootstrap Modal to display the modal
  } else {
    next();
  }
};

module.exports = { passport, requireAuth };
