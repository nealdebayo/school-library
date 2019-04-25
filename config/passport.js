'use strict';
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

passport.use(new LocalStrategy({
    usernameField: 'email'
},
function(username, password, done) {
    User.findOne({ email: username }, '+hash +salt', function(err, user) {
        if (err) return done(err);
        // Return if user not found in database
        if (!user) {
            return done(null, false, {
                message: 'User not found'
            })
        }
        // Return if password is incorrect
        if (!user.validPassword(password)) {
            return done(null, false, {
                message: 'Password is incorrect'
            })
        }
        // Return user object for correct credentials
        return done(null, user);
    })
}
))