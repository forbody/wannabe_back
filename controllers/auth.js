const bcrypt = require('bcrypt')
const { User, User_detail } = require('../models')
const passport = require('passport')
const jwt = require('jsonwebtoken')

exports.createToken = async (req, res, next) => {
    try {
        passport.authenticate('local', { session : false }, (err, user, info)=>{
            if (err) {
                console.error(err);
                return next(err);
            } else if (!user) {
                throw new Error(info.message);
            }
            // 정상 로그인
            return req.login(user, (err) => {
                const accessToken = jwt.sign(
                    { id: user.id, nickname: user.user_name, grade: user.grade},
                    process.env.JWT_SECRET,
                    { expiresIn : '1d', issuer: "wannabe", subject: "accessToken"}
                );
                const refreshToken = jwt.sign(
                    { id: user.id, nickname: user.user_name, grade: user.grade},
                    process.env.JWT_SECRET,
                    { expiresIn : '7d', issuer: "wannabe", subject: "refreshToken"}
                );
                User.update({ refresh_token: refreshToken }, { where : { id: user.id }})
                if (err) {
                    console.error(err);
                    return next(err);
                };
                res.json({
                    code: 200,
                    message: '토큰이 발급되었습니다.',
                    accessToken,
                    userId: user.id
                })
            })
        })(req, res, next);
    } catch (err) {
        console.error(err);
        next(err)
    }
}

exports.join = async(req, res, next) => {
    console.log(req.body);
    const { email, user_name, password, gender, birthday, grade, role_model_id, height, weight, bodyshape, img} = req.body;
    try{
        const exUser = await User.findOne({ where: { email }});
        if (exUser) {
            throw new Error ("이미 가입된 이메일입니다.")
        }
        const hash = await bcrypt.hash(password, 10)
        const user= await User.create({
            email,
            user_name,
            password: hash,
            gender,
            birthday,
            grade,
            role_model_id: bodyshape
        });
        user.createUserDetail({
            height,
            weight,
            bmi: height / weight * weight,
            bodyshape,
            rec_cal: weight * 30,
            img
        })
        res.json ({
            code: 200,
            message: '회원가입이 완료되었습니다.'
        })
    } catch(err) {
        console.error(err)
        return next(err)
    }
}

exports.refreshToken = async (req, res, next) => {
    try{
        const { accessToken } = req.body;
        const accessResult = jwt.decode(accessToken, process.env.JWT_SECRET);
        const user = await User.findOne({ where: { id : accessResult.id }});
        console.log(user);
        const refreshResult = jwt.verify(user.refresh_token, process.env.JWT_SECRET)
        if (accessResult.id !== refreshResult.id){
            throw new Error ("토큰이 일치하지 않습니다.")
        }
        const newAccessToken = jwt.sign( // 토큰 속 id가 일치하면 새로운 토큰을 준다.
            { id: accessResult.id, user_name: accessResult.user_name},
            process.env.JWT_SECRET,
            { expiresIn : '1d', issuer: "wannabe", subject: "accessToken"}
        );
        res.json({
            code: 200,
            message: "새로운 토큰이 발급되었습니다.",
            accessResult: newAccessToken
        })
    } catch(err) {
        console.error(err)
        return next(err)
    }
}

exports.kakaoLogin = async(req, res, next) => {
    try {
        passport.authenticate('kakao', {session:false}, (err, user, info) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                throw new Error(info.message)
            }
            return req.login(user, (err) => {
                const accessToken = jwt.sign(
                    { id: user.id, user_name: user.user_name},
                    process.env.JWT_SECRET,
                    { expiresIn : '1d', issuer: "wannabe", subject: "accessToken"}
                );

                const refreshToken = jwt.sign(
                    { id: user.id, user_name: user.user_name},
                    process.env.JWT_SECRET,
                    { expiresIn : '7d', issuer: "wannabe", subject: "refreshToken"}
                );
                User.update({ refresh_token: refreshToken }, { where : { id: user.id }})
                if (err) {
                    console.error(err);
                    return next(err);
                };
                res.cookie("userId", user.id, {
                    httpOnly: false,
                    secure: false
                })
                res.cookie("accessToken", accessToken, {
                    httpOnly: false,
                    secure: false
                })
                res.status(302).redirect(process.env.CLIENT_URL+'/todolist')
            })
        })(req, res, next)
    } catch (err) {
        console.error(err)
        return next(err)
    }
}