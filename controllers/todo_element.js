const { BOOLEAN } = require('sequelize');
const { Todo_element, Categroy, Food , Exercise, Todo_list, User} = require('../models');

let year = new Date().getFullYear(); // 년도
let month = new Date().getMonth();  // 월
let date = new Date().getDate();  // 날짜
let today = `${year}-${month}-${date}`

exports.create_todo_ele = async (req, res, next) => {
    try {
            const ele = await Todo_element.create({
                category_id : req.body.category_id,
                todo_id : req.body.todo_id,  //새로 컬럼 추가해야되는부분
                UserId :req.user.id,
                date : today, //req날짜를 위의 형식으로 보내야하니 나중에 수
            })
            req.body.category_id==2 ? await ele.addFood(req.body.todo_id) :await ele.addExercise(req.body.todo_id)
            await ele.addTodo_list(req.body.todo_list_id) // todo_list_id 프론트에서 토큰id와 비교한값값을 통해 받아오면된다
            res.json({
                code : 200,
                message : '일과등록이 완료되었습니다.'
            })
            
    } catch (err) {
        console.error(err);
        next(err)
    }
}

exports.get_todo_ele = async (req, res, next) => {
    try {
            const ele = await Todo_element.findAll({
                where : {
                    user_id : req.user.id,
                },
                include: [
                    {
                        model: '$Todo_element.category_id$'==1 ? Exercise : Food,
                    },
                    {
                        model: Todo_list,
                        where : {id : req.params.id}
                    },
                ]
            });
            res.json({
                code:200,
                payload: ele
            })
    } catch (err) {
        console.error(err);
        next(err)
    }
}

exports.update_todo_ele = async (req, res, next) => {
    try {
            await Todo_element.update({
                todo_id : req.body.todo_id
            },{
                where: {
                    id:req.params.id,
                    UserId : req.user.id
                }
            })
            res.json({
                code:200,
                message : '일과가 수정되었습니다.'
            })
    } catch (err) {
        console.error(err);
        next(err)
    }
}

exports.delete_todo_ele = async (req, res, next) => {
    try {
            await Todo_element.destroy({
                where: {
                    id:req.params.id,
                    UserId : req.user.id
                }
            })
            res.json({
                code:200,
                message : '일과가 삭제되었습니다.'
            })
    } catch (err) {
        console.error(err);
        next(err)
    }
}


exports.share_todo_list = async (req, res, next ) => {
    try {
            const arr = req.body.arr
            arr.map(async e =>  {
                const ele = await Todo_element.create({
                    category_id : e.category_id,
                    todo_id : e.todo_id,  //새로 컬럼 추가해야되는부분
                    UserId :req.user.id,
                    date : today, //req날짜를 위의 형식으로 보내야하니 나중에 수
                })
                e.category_id==2 ? await ele.addFood(e.todo_id) :await ele.addExercise(e.todo_id)
                await ele.addTodo_list(req.body.todo_list_id) // todo_list_id 프론트에서 토큰id와 비교한값값을 통해 받아오면된다
            })
            res.json({
                code : 200,
                message : '일과를 가져왔습니다.'
            })
    } catch (err) {
        console.error(err);
        next(err)
    }
}

exports.update_ele_recur = async (req, res, next ) => {
    try {
        await Todo_element.update({
            recur : parseInt(req.body.arr)
        },
        {
            where : {id : req.params.id}
        })
        res.json({
            code : 200,
            message : '일과 반복이 수정되었습니다.'
        })
    } catch (err) {
        console.error(err);
        next(err)
    }
}

exports.create_ele_recur = async (req, res, next ) => {
    try {   
            const ele = await Todo_element.findOne({
                where : {id : req.body.params}
            })
            if(req.body.arr) {
                arr.map(async day => {
                    await ele.addTodo_recur(day.id)
                })
            }
            res.json({
                code : 200,
                message : '일과 반복이 추가되었습니다.'
            })
    } catch (err) {
        console.error(err);
        next(err)
    }
}





