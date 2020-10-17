const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User          = require('../models/User');
const bcrypt        = require('bcrypt');

passport.use(new LocalStrategy({
    usernameField: 'username'
  }, 
  (username, password, next) => {

    User.findOne({ username })
    .then(foundUser => {
      if (!foundUser) {
        return next(null, false, { message: 'Incorrect username' });
      }

      if (!bcrypt.compareSync(password, foundUser.password)) {
        return next(null, false, { message: 'Incorrect password' });
      }

      return next(null, foundUser);
    })
    .catch(err => next(err));

  }
));
