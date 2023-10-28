const OAuth2Strategy = require('passport-oauth2');
const axios = require('axios');

class SwarmStrategy extends OAuth2Strategy {
  constructor(options, verify) {
    options = options || {};
    options.authorizationURL = options.authorizationURL || 'https://swarmapp.com/oauth2/authorize';
    options.tokenURL = options.tokenURL || 'https://api.swarmapp.com/oauth2/token';
    super(options, verify);
    this.name = 'swarm';
    this._userProfileURL = 'https://api.swarmapp.com/v2/users/self';
  }

  async userProfile(accessToken, done) {
    try {
      const { data } = await axios.get(this._userProfileURL, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      done(null, data);
    } catch (err) {
      done(err);
    }
  }
}

module.exports = SwarmStrategy;
