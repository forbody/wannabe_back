const passport = require("passport");
const User = require("../models/user");
const KakaoStrategy = require("passport-kakao").Strategy;

module.exports = () => {
    passport.use(new KakaoStrategy({
        clientID: process.env.KAKAO_KEY,
        callbackURL: '/v1/auth/kakao/callback'
    }, async (accessToken, refreshtoken, profile, done) => {
        try {
            const exUser = await User.findOne({
                where : {
                    kakao_id: profile.id,
                    provider:'kakao'
                }
            });
            if (exUser) {
                done(null, exUser);
            } else {
                const newUser = await User.create({
                    user_name: profile.displayName,
                    kakao_id: profile.id,
                    provider: 'kakao',
                })
                done(null, newUser);
            }
        } catch (err) {
            console.error(err)
        }
    }))
}