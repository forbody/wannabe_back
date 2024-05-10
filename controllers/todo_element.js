const { Todo_ele } = require('../models');

exports.regist_todo_ele = async (req, res, next) => {
    try {
        const todo_ele = await Todo_ele.create({
            category :req.body.category, 
            sort : req.body.sort,
            name : req.body.name, 
            // userId :req.user.id tolken 부분되면 완성?!
        })
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
            const todo_ele = await Todo_ele.findAll({
                where : { 
                    date:req.parmas.date ,
                    user_id : req.user.id
                },
                inclued : [
                    {
                        model : Exercise,
                        attribute : ['name', 'sort']
                    },
                    {
                        model : food,
                        attribute : ['name', 'sort']
                    }
                ]
            })
            res.json({
                code:200,
                payload: todo_ele
            })
    } catch (err) {
        console.error(err);
        next(err)
    }
}

exports.update_todo_element = async (req, res, next) => {
    try {
            await Todo_ele.update({
                element_name : req.body.name
            },{
                where: {id:req.params.id}
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
            await Todo_ele.destroy({
                where : {id: req.params.id}
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