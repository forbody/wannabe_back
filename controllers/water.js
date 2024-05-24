const { Op } = require('sequelize');
const { Water } = require('../models');
const moment = require('moment');

exports.getWater = async (req, res, next) => {
    try{
        const water =  await Water.findOne({  
            where: { UserId: req.params.id },
            order: [['createdAt', 'DESC']]
        });
        res.json ({
            code: 200,
            payload: water || {}
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
}

exports.createWater = async (req, res, next) => {
    try {
        const [water, isCreated] = await Water.findOrCreate({
            where: {
                createdAt: moment().format('YYYY-MM-DD 00:00:00'),
                UserId: req.user.id,
            }
        });
        res.json({
            code : 200,
            payload : water
        })
    } catch (err) {
        console.error(err);
        next(err)
    }
}

exports.updateWater = async (req, res, next) => {
    try {
        console.log(req.body);
        const water = await Water.update(
            {water: req.body.water},
            {where: {
                createdAt: moment().format('YYYY-MM-DD 00:00:00'),
                UserId: req.user.id,
            }
        });
        res.json({
            code : 200,
            message: '물 업데이트 완료'
        })
    } catch (err) {
        console.error(err);
        next(err)
    }
}