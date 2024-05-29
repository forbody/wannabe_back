const { Exercise, Health_tip } = require('../models');

// 유저 로그인 시 , 헬스 팁 조회
exports.Health_tip = async (req, res, next) => {
    console.log('전체 헬스팁 조회');

    try {
        const healthtips = await Health_tip.findAll();
        res.json({
            code : 200,
            payload : healthtips
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
}


// 헬스 팁 db에 저장, 목록 나열
exports.getTip = async(req, res, next) => {
    const healthTips = await Health_tip.findAll();
    const rand_idx = Math.floor(Math.random() * healthTips.length)
    const healthTip = healthTips[rand_idx];
    res.json({
        code : 200,
        payload : healthTip
    });
}

exports.dummyTip = async(req, res, next) => {
    await Health_tip.bulkCreate([
        {health_tip: "설탕과 칼로리가 많은 음료를 피하라"},
        {health_tip: "충분한 수면을 취한다"},
        {health_tip: "프로바이오틱스와 섬유질로 장 건강을 유지한다"},
        {health_tip: "식사 전에 물을 조금 마신다"},
        {health_tip: "자기 전에 밝은 빛을 피한다"},
        {health_tip: "비타민 D를 더 많이 섭취한다"},
        {health_tip: "채소와 과일을 많이 먹는다"},
        {health_tip: "단백질을 충분히 섭취한다"},
    ])
}
