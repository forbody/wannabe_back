const { User } = require('../models');
const { Food } = require('../models');

exports.uploadFood = async  (req, res, next) => {
    try {
        const fakeFood = [
            {"food_name":"꿩불고기","calory":368.8, "CategoryId" : 2},
            {"food_name":"닭갈비","calory":595.61, "CategoryId" : 2},
            {"food_name":"닭갈비","calory":558.47, "CategoryId" : 2},
            {"food_name":"닭꼬치","calory":176.72, "CategoryId" : 2},
            {"food_name":"더덕구이","calory":184, "CategoryId" : 2},
            {"food_name":"도미구이","calory":397, "CategoryId" : 2},
            {"food_name":"돼지갈비","calory":240.32, "CategoryId" : 2},
            {"food_name":"병어구이","calory":488, "CategoryId" : 2},
            {"food_name":"불고기","calory":395.29, "CategoryId" : 2},
            {"food_name":"붕장어소금구이","calory":296.54, "CategoryId" : 2},
            {"food_name":"소양념갈비구이","calory":989.15, "CategoryId" : 2},
            {"food_name":"양념왕갈비","calory":480.81, "CategoryId" : 2},
            {"food_name":"양념장어구이","calory":433.35, "CategoryId" : 2},
            {"food_name":"임연수구이","calory":494, "CategoryId" : 2},
            {"food_name":"짚불구이곰장어","calory":326.21, "CategoryId" : 2},
            {"food_name":"햄버그스테이크","calory":457.7, "CategoryId" : 2},
            {"food_name":"황태구이","calory":437.57, "CategoryId" : 2},
            {"food_name":"훈제오리","calory":797.14, "CategoryId" : 2}
        ]
        await Food.bulkCreate(fakeFood)
        res.json("ok")
    } catch (err) {
        console.error(err);
        next(err)
    }
}

// 물 마신 횟수를 유저 정보에서 따오기
exports.watercount = async (req, res, next) => {
    console.log('물 마신 횟수 체크');
    try {
        const Count = await User.findOne({
            where : { id : req.params.id }
        })
        res.json(Count);
    } catch (error) {
        console.error(error);
        next(error);
    }
}

// 하루 권장 칼로리 섭취량 제공

// 오늘 섭취한 칼로리 입력

// 식단 생성 테이블 제공

// 음식 정보 검색 테이블 