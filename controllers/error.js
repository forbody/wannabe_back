const { Temp} = require('../models');
exports.postErr =async (req, res, next) => {
    try {
            const { errorDetails } = req.body;
            const result = await Temp.create({
                description : errorDetails
            })
            res.json({ 
                code : 200,
                message: '오류사항 정상적으로 등록되었습니다.' 
            });
    } catch (err) {
        console.error(err)
        next(err)
    }
}