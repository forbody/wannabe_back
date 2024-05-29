const { Sequelize } = require('sequelize');
const { Todo_element, Categroy, Food , Exercise, Todo_list, User} = require('../models');

exports.create_todo_ele = async (req, res, next) => {
    try {
            const ele = await Todo_element.create({
                category_id : req.body.category_id,
                todo_id : req.body.todo_id,  
                UserId :req.user.id,
                order: req.body.order,
                date : req.body.date, 
                reps: req.body.reps,
                sets: req.body.sets,
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
                order: [['achieve', 'ASC']],
                include: [
                    {
                        model: Exercise
                    },
                    {
                        model: Food
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
            const orderMeal = req.body.order?req.body.order:(req.body.meal === '아침' ? 1 : req.body.meal === '점심' ? 2 : 3)
            const arr = req.body.arr
            arr.map(async e =>  {
                const todo_id = e.todo_id ? e.todo_id : e.id
                const category_id = e.category_id ? e.category_id : e.CategoryId
                const ele = await Todo_element.create({
                    category_id :  category_id,
                    todo_id : todo_id,  
                    UserId :req.user.id,
                    date : req.body.date, //req날짜를 위의 형식으로 보내야하니 나중에 수
                    order : orderMeal,
                    reps : e.reps,
                    sets : e.sets,
                })
                category_id==2 ? await ele.addFood(todo_id) :await ele.addExercise(todo_id)
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


exports.update_ele_achieve = async (req, res, next ) =>  {
    try {
        await Todo_element.update({
                achieve : Sequelize.literal('Not achieve')
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
