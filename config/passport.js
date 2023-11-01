const passport = require("passport")
const user = require("../model/user");

const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.privateKey;

passport.use(
    new JwtStrategy(opts, (payload, done) => {

        user.findById({ id: payload.id })
            .then(data => {
                if (data) {
                    return done(null, data);
                }

                return done(null, false);
            })
            .catch(err => {
                return done(err, false);
            });
    })
);


module.exports = async app => {
    app.use(passport.initialize());

};