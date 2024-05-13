const { Exercise, Category } = require('../models');

exports.getExercises = async (req, res, next) => {
    console.log('전체 운동data 조회');
    try {
        const exercises = await Exercise.findAll();
        res.json(exercises);
    } catch (error) {
        
    }
}

exports.sortExercise = async (req,res,next) => {
    console.log(req.query.q);
    console.log('sort별 운동 목록 조회');
    try {
        const exercises = await Exercise.findAll({
            where: {sort: req.query.q}
        });
        res.json(exercises);
    } catch (error) {
        
    }
}

exports.exerciseInfo = async (req,res,next) => {
    console.log('각 운동에 대한 상세 정보');
    try {
        const exercise_info = await Exercise.findOne({
            where : { id : req.params.id },
            // attributes: ['description', 'url']  -> react로 원하는 속성값 가져올 수 있음!
        })
        res.json(exercise_info);
    } catch (error) {
        
    }
}

exports.showRandom = (req, res, next) => {
    console.log(req.params.user_detail_id);
    console.log('본인이 지정한 셀럽 이미지 배치. 랜덤 문구 표시');
}

// 작업 시 더미데이터 생성 (단, 배포 시 삭제할 것.)
exports.hiddenInsert = async(req, res, next) => {
    // await Category.bulkCreate([{
    //     category_name: '운동3',
    //     img: 'exercise.jpg'
    // },{
    //     category_name: '식단3',
    //     img: 'food.jpg'
    // }]);

    await Exercise.bulkCreate([{
        
    },{
        
    },{
        
    },{
        
    }])

    res.json({result: 'ok'});
}