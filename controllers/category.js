const { Category , Food, Exercise} = require('../models');

exports.get_category = async (req, res, next) => {
    try {
        const category = await Category.findOne({
            where : {id : req.params.id},
            include: [
                {
                    model: req.params.id==1 ? Exercise : Food,
                }
            ]
        })
        res.json({
            code : 200,
            payload : category
        })
    } catch (err) {
        console.error(err);
        next(err)
    }
}