const { sequelize } = require('../models');
const { Food, Todo_element } = require('../models');
const moment = require('moment');

// 물 마신 횟수를 유저 정보에서 따오기
// exports.watercount = async (req, res, next) => {
//     console.log('물 마신 횟수 체크');
//     try {
//         const Count = await User.findAll({
//             where : { id : req.params.id }
//         })
//         res.json(Count);
//     } catch (error) {
//         console.error(error);
//         next(error);
//     }
// } => 대신 water DB 사용중입니다

// 음식들 가져오기
exports.getDishes = async (req, res, next) => {
    try{
        const food =  await Food.findAll({  
            where: { sort: req.params.sort },
        });
        res.json ({
            code: 200,
            payload: food || {}
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
}

// 음식 가져오기
exports.getDish = async (req, res, next) => {
    try{
        const food =  await Food.findOne({  
            where: { id : req.params.id  },
        });
        res.json ({
            code: 200,
            payload: food || {}
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
}

// 랜덤 음식 5개 가져오기
exports.getRandomDishes = async (req, res, next) => {
    try {
        const [result] = await sequelize.query(
            `(select * from food where sort = 'main_dish' order by rand() limit 1) union
            (select * from food where sort = 'side_dish' order by rand() limit 3) union
            (select * from food where sort = 'dessert' order by rand() limit 1);`
        )
        res.json({
            code: 200,
            result
        })
    } catch (error) {
        console.error(error);
        next(error);;
    }
}

// 랜덤 음식 5개 가져와서 아점저 중에 골라 todo_element에 집어넣기 ( 이미 아점저가 존재하면 true 반환, 아점저가 없으면 5개 랜덤 선택해서 생성)
exports.getTodayDishes = async(req, res, next) => {
    try {
        const orderMeal = (req.body.meal === '아침' ? 1 : req.body.meal === '점심' ? 2 : 3)
        const addedMeal = await Todo_element.findOne({
            where: {
                order: orderMeal,
                date: moment().format('YYYY-MM-DD'),
                UserId : req.user.id
            }
        });
        const isAdded = Boolean(addedMeal);
        let result;
        if (isAdded) {
            // already bring
            // SELECT f.* FROM food f JOIN todo_elements te ON f.id = te.todo_id where te.user_id = 10 and te.deleted_at is null and te.order = 2 and date='2024-05-23';
            result = await Food.findAll({
                    include: [{
                        model: Todo_element,
                        where:
                        {
                            order: orderMeal,
                            date: moment().format('YYYY-MM-DD'),
                            UserId : req.user.id
                        }
                    }]
            })
        } else {
            // random
            [result] = await sequelize.query(
                `(select * from food where sort = 'main_dish' order by rand() limit 1) union
                (select * from food where sort = 'side_dish' order by rand() limit 3) union
                (select * from food where sort = 'dessert' order by rand() limit 1);`
            )
        }
        res.json({
            code: 200,
            isAdded,
            result
        })
    } catch (error) {
        console.error(error);
        next(error);;
    }
}
// 하루 권장 칼로리 섭취량 제공

// 오늘 섭취한 칼로리 입력

// 식단 생성 테이블 제공

// 음식 정보 검색 테이블 