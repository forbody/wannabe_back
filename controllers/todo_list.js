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
// 전체 리스트 받아오기도 하나 만들어야할듯..??????
exports.get_todo_list_all = async (req, res, next) => {
    try {
        const todo_list = await Todo_list.findAll({
            where : {share : true},
            include : [
                {
                    model: User,
                    attributes : ['id', 'email', 'user_name'],
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

exports.delete_todo_list = async (req, res, next) => {
    try {
            
    } catch (err) {
        console.error(err);
        next(err)
    }
}
