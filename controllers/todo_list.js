const { Todo_list ,User } = require('../models');

exports.get_todo_list = async (req, res, next) => {
    try {
        const user = await User.findOne({
            where : {id : req.user.id},
        })
        if(user) {
            const todo_list = await user.getTodo_list({
                where : {date : req.user.params.date},
                include : [{
                    model : update_todo_element,
                }]
            })
        }
        await Todo_list.create({
            todolist_name,
            share
        })

    } catch (err) {
        console.error(err);
        next(err)
    }
}

exports.modify_todo_list = async (req, res, next) => {
    try {
            
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





exports.delete_todo_list = async (req, res, next) => {
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
