const { User, User_detail } = require('../models');

exports.getUsers = async (req, res, next) => {
    try{
        const users =  await User.findAll({  
            include: [{ model: User_detail, as: 'UserDetail' }]
        })
        res.json ({
            code: 200,
            payload: users || {}
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
}

exports.getUser = async (req, res, next) => {
    try{
        const user =  await User.findOne({  
            where: { id: req.params.id },
            include: [{ model: User_detail, as: 'UserDetail' }]
        });
        
        res.json ({
            code: 200,
            payload: user || {}
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
}

exports.modifyUser = async (req, res, next) => {
    try {
        const ud = await User_detail.findOne({
            where: req.user.id,
            order: [['createdAt', 'DESC']]
        })
        await User_detail.update({
            height: req.body.height,
            weight:req.body.weight,
            bodyshape: req.body.bodyshape,
            img: req.body.img
        },{
            where: { id : ud.id}
        });
        res.json({
            code: 200,
            message: '유저 수정 완료'
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
}

exports.deleteUser = async (req, res, next) => {
    try {
        await User.destroy({
            where: { id : req.user.id},
            include: [{ model: User_detail, as: 'UserDetail' }]
        });
        res.json({
            code: 200,
            message: '유저 삭제 완료'
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
}

exports.addUserDetail = async (req, res, next) => {
    try {
        const { height, weight, bodyshape, img } = req.body
        console.log(req.user.id);
        await User_detail.create({
            height,
            weight,
            bmi: height / weight * weight,
            bodyshape,
            rec_cal: weight * 30,
            img,
            UserId : req.user.id // login
        })
        res.json({
            code: 200,
            message: '유저 세부 정보 추가 완료'
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
}

exports.like = async (req, res, next) => {
    try{
        const user = await User.findOne({
            where : { id : req.body.id }, // 상대 아이디: req.body.id
            include: [{ model: User_detail, as: 'UserDetail' }]
        })
        if (user) {
            await user.addLikers(req.user.id) // 내 아이디: req.user.id
            res.json({
                code: 200,
                message: "좋아요 되었습니다."
            })
        } else {
            res.json({
                code: 404,
                message: "유저를 찾을 수 없습니다."
            });
        }
    }catch (err) {
        console.error(err);
        next(err);
    }
}

exports.unlike = async (req, res, next) => {
    try{
        const user = await User.findOne({
            where : { id : req.body.id }, // 상대 아이디: req.body.id
            include: [{ model: User_detail, as: 'UserDetail' }]
        })
        if (user) {
            await user.removeLikers(req.user.id) // 내 아이디: req.user.id
            res.json({
                code: 200,
                message: "좋아요 취소 되었습니다."
            })
        } else {
            res.json({
                code: 404,
                message: "유저를 찾을 수 없습니다."
            });
        }
    }catch (err) {
        console.error(err);
        next(err);
    }
}

exports.getLikers = async (req, res, next) => {
    try{
        const user = await User.findOne({
            where : { id : req.params.id }, // 조회할 대상자의 아이디: req.params.id
            include: [{ model: User_detail, as: 'UserDetail' }]
        });
        if (user) {
            const likers = await user.getLikers({
            })
            res.json({
                code: 200,
                payload: likers
            })
        } else {
            res.json({
                code: 404,
                message: "유저를 찾을 수 없습니다."
            });
        }
    }catch (err) {
        console.error(err);
        next(err);
    }
}

exports.getLikings = async (req, res, next) => {
    try{
        const user = await User.findOne({
            where : { id : req.params.id }, // 조회할 대상자의 아이디: req.params.id
            include: [{ model: User_detail, as: 'UserDetail' }]
        });
        if (user) {
            const likings = await user.getLikings({
            })
            res.json({
                code: 200,
                payload: likings
            })
        } else {
            res.json({
                code: 404,
                message: "유저를 찾을 수 없습니다."
            });
        }
    }catch (err) {
        console.error(err);
        next(err);
    }
}