const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User')

passport.use(new LocalStrategy({
        usernameField: 'username'
    },
    (username, password, done) => {

        User.findOne({ username: username }, (err, user) => {

            if(err) return done(err);

            if(!user) return done(null, false, {message: 'user not found'});

            if(!user.validPassword(password)) return done(null, false, {message: 'Wrong Password'});

            user.save(function(err){
                return done(null, user);
            });

        })
    }
));
