const { Sequelize } = require('sequelize');
const { Todo_list ,User, Todo_element, Share_comment } = require('../models');

exports.create_todo_list = async (req, res, next) => {
    try {
        const [todo_list, created] = await Todo_list.findOrCreate({
            where : {date : req.body.date},
            attributes : ['id', 'title', 'share'],
            include : [
                {
                    model: User,
                    attributes : ['id', 'user_name'],
                    where : {id : req.user.id}
                },
            ]
        });
        if(created) {
            await todo_list.addUser(req.user.id)
            res.json({
                code : 200,
                message : 'todo_list created',
                payload : {id : todo_list.id}
            })
        }
        res.json({
            code : 200,
            payload : todo_list
        })

    } catch (err) {
        console.error(err);
        next(err)
    }
}

exports.get_todo_list_all = async (req, res, next) => {
    try {
        const todo_list = await Todo_list.findAll({
            where : {share : true},
            order: [['createdAt', 'DESC']],
            include: [
                {
                    model: User,
                    attributes: ['id', 'email', 'user_name'],
                    through: { as: 'List_user' }  // List_user 관계 포함
                },
                {
                    model: User,
                    as: 'ListRecommend',
                    attributes: ['id'],
                    through: { as: 'List_follow' },  // List_follow 관계 포함
                },
                {
                    model: Share_comment
                }
            ]
        })
        res.json({
            code : 200,
            payload :todo_list
        })
    } catch (err) {
        console.error(err);
        next(err)
    }
}
exports.get_todo_list_my = async (req, res, next) => {
    try {
        const todo_list = await Todo_list.findAll({
            where : {share : true},
            order: [['createdAt', 'DESC']],
            include : [
                {
                    model: User,
                    attributes : ['id', 'email', 'user_name'],
                    where : {id : req.user.id}
                },
                {
                    model : Share_comment
                }
            ]
        })
        res.json({
            code : 200,
            payload :todo_list
        })
    } catch (err) {
        console.error(err);
        next(err)
    }
}


exports.get_todo_list = async (req, res, next) => {
    try {
        const todo_list = await Todo_list.findOne({
            where : {date : req.params.date},
            include : [
                {
                    model: User,
                    attributes : ['id'],
                    where : {id : req.user.id}
                },
                {
                    model: Todo_element,
                    attributes : ['id', 'category_id' , 'todo_id']
                },
                {
                    model : Share_comment
                }
            ]
        })
        res.json({
            code : 200,
            payload :todo_list
        })
    } catch (err) {
        console.error(err);
        next(err)
    }
}

exports.modify_todo_list = async (req, res, next) => {
    try {   
            await Todo_list.update({
                share : Sequelize.literal('Not share') 
            },{
                where : {id :req.params.id}
            })
            res.json({
                code : 200,
                message : 'todo_list share 수정완료'
            })
    } catch (err) {
        console.error(err);
        next(err)
    }
}

exports.todo_list_recommend = async (req, res, next) => {
    try {   
        const recommend = await Todo_list.findByPk(req.params.id)
        if(recommend) {
            await recommend.addListRecommend(req.user.id)
            res.json({
            code : 200,
            message : '추천이 완료되었습니다.'
        })
        } else {
            res.json({
                code: 404,
                message: "리스트를 찾을수 없습니다."
            });
        }

    } catch (err) {
        console.error(err);
        next(err)
    }
}

exports.todo_list_unrecommend = async (req, res, next) => {
    try {   
        const recommend = await Todo_list.findByPk(req.params.id)
        if(recommend) {
            await recommend.removeListRecommend(req.user.id)
            res.json({
            code : 200,
            message : '추천이 취소되었습니다.'
        })
        } else {
            res.json({
                code: 404,
                message: "리스트를 찾을수 없습니다."
            });
        }
    } catch (err) {
        console.error(err);
        next(err)
    }
}

