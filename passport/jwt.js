const passport = require("passport");
const User = require('../models/user');
const { ExtractJwt } = require("passport-jwt");
const JWTStrategy = require('passport-jwt').Strategy;

module.exports = () => {
    passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJwt.fromHeader('authorization'),
        secretOrKey: process.env.JWT_SECRET
    }, async (jwtPayload, done) => {
        try {
            const user = await User.findOne({ where : { id: jwtPayload.id }});
            if (user) {
                done(null, user);
                return;
            }
            done(null, false, { message: "유저를 찾을 수 없습니다."});
        } catch (err) {
            console.error(err);
            done(err);
        }
    }));
}