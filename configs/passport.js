const { ExtractJwt, Strategy } = require('passport-jwt');
const mongoose = require('mongoose');
const User = mongoose.model('userDetails');
const { jwtSecret } = require('../configs/keys');
const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = jwtSecret;
module.exports = passport => {
  passport.use(
    new Strategy(opts, (jwt_payload, done) => {
      const { id } = jwt_payload;
      User.findById(id)
        .then(user => {
          // console.log(user);
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        })
        .catch(err => console.log(err));
    }),
  );
};
