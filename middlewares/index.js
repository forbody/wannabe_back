const passport = require("passport");

exports.verifyToken = (req, res, next) => {
    try {
        passport.authenticate('jwt', {session: false}, (info, user, authErr) => {
            if (authErr) {
                if (authErr.message === "jwt expired") {
                    authErr.status = 403;
                }
                return next (authErr);
            }
            if (!user) {
                const err = new Error('유효하지 않은 토큰입니다.');
                err.status = 401;
                return next (err);
            }
            req.user = user;
            return next();
        }) (req, res, next)
    } catch (err) {
        console.error(err);
        next(err)
    }
}