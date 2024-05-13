const passport = require("passport")
const { User } = require("../models")
const local = require("./local");
const jwt = require("./jwt");
const kakao = require("./kakao")

module.exports = () => {
    local();
    jwt();
    kakao()

    // 로그인 전략 성공 시 호출
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    // 매 요청 시마다 실행
    passport.deserializeUser((id, done) => {
        User.findOne({
            where: { id },
            include: [
                {
                    model: User,
                    attribute: ['id', 'user_name'],
                    as: 'Likers'
                },
                {
                    model: User,
                    attribute: ['id', 'user_name'],
                    as: 'Likings'
                }
            ]
        })
        .then (user => {
            done(null, user);
        })
        .catch(err => done(err))
    })
}