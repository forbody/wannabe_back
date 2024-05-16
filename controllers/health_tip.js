const { Health_tip } = require('../models');

// 유저 로그인 시 , 헬스 팁 조회
exports.Health_tip = async (req, res, next) => {
    console.log('전체 헬스팁 조회');

    try {
        const healthtips = await Health_tip.findAll();
        res.json(healthtips);
    } catch (error) {
        console.error(error);
        next(error);
    }
}


// 헬스 팁 db에 저장, 목록 나열
exports.getTips = async(req, res, next) => {
    await Tips.bulkCreate([{
        desciption : ''
    },{
        desciption : ''
    }])

    res.json({result: 'ok'});
}