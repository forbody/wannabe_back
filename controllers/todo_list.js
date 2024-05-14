const { Sequelize } = require('sequelize');
const { Todo_list ,User, Todo_element, share_comment } = require('../models');


let year = new Date().getFullYear(); // 년도
let month = new Date().getMonth();  // 월
let date = new Date().getDate();  // 날짜
let today = `${year}-${month}-${date}`


exports.create_todo_list = async (req, res, next) => {
    try {
        const [todo_list, created] = await Todo_list.findOrCreate({
            where : {date : today},
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
                payload : todo_list.id
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
exports.get_todo_list = async (req, res, next) => {
    try {
        const todo_list = await Todo_list.findOne({
            where : {date : today},
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
            // const temp = await Todo_list.findOne({
            //     where : {id : req.params.id},
            //     attribute  : ['share']
            // })
            // const share = temp.dataValues.share
            await Todo_list.update({
                share : Sequelize.literal('Not share') // sequelize update toggle
            },{
                where : {id :req.params.id}
            })
            res.json({
                code : 200,
                message : 'todo_list 수정완료'
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
