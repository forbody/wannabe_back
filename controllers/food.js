const { Food, Category } = require('../models');

exports.uploadFood = async  (req, res, next) => {
    try {
        const fakeFood = [
            { "food_name":"꿩불고기","calory":368.8, "sort":"볶음", "CategoryId" : 2},
            { "food_name":"닭갈비","calory":595.61, "sort":"볶음", "CategoryId" : 2},
            { "food_name":"닭갈비","calory":558.47, "sort":"볶음", "CategoryId" : 2},
            { "food_name":"닭꼬치","calory":176.72, "sort":"볶음", "CategoryId" : 2},
            { "food_name":"더덕구이","calory":184, "sort":"볶음", "CategoryId" : 2},
            { "food_name":"도미구이","calory":397, "sort":"볶음", "CategoryId" : 2},
            { "food_name":"돼지갈비","calory":240.32, "sort":"볶음", "CategoryId" : 2},
            { "food_name":"병어구이","calory":488, "sort":"볶음", "CategoryId" : 2},
            { "food_name":"불고기","calory":395.29, "sort":"볶음", "CategoryId" : 2},
            { "food_name":"붕장어소금구이","calory":296.54, "sort":"볶음", "CategoryId" : 2},
            { "food_name":"소양념갈비구이","calory":989.15, "sort":"볶음", "CategoryId" : 2},
            { "food_name":"양념왕갈비","calory":480.81, "sort":"볶음", "CategoryId" : 2},
            { "food_name":"양념장어구이","calory":433.35, "sort":"볶음", "CategoryId" : 2},
            { "food_name":"임연수구이","calory":494, "sort":"볶음", "CategoryId" : 2},
            { "food_name":"짚불구이곰장어","calory":326.21, "sort":"볶음", "CategoryId" : 2},
            { "food_name":"햄버그스테이크","calory":457.7, "sort":"볶음", "CategoryId" : 2},
            { "food_name":"황태구이","calory":437.57, "sort":"볶음", "CategoryId" : 2},
            { "food_name":"훈제오리","calory":797.14,"sort":"볶음",  "CategoryId" : 2}
        ]
        await Category.bulkCreate([
            {"category_name" : "workout", "img" : "workout.png"},
            {"category_name" : "food", "img" : "food.png"},
        ])
        await Food.bulkCreate(fakeFood)
        res.json("ok")
    } catch (err) {
        console.error(err);
        next(err)
    }
}