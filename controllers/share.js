const { Share_comment } = require('../models');

exports.upload_todo_list = async (req, res, next) => {
    try {
        await Share_comment.create({
            comment : req.body.comment,
            TodoListId : req.body.listId
        })
        res.json({
            code : 200,
            message : '공유가 완료되었습니다.',
        })
    } catch (err) {
        console.error(err);
        next(err)
    }
}


exports.modify_share_comment = async (req, res, next) => {
    try {
        await Share_comment.update({
            comment : req.body.comment
        }, {
            where : {id : req.params.id}
        })
        res.json({
            code : 200,
            message : '공유 설명이 수정되었습니다'
        })
    } catch (err) {
        console.error(err);
        next(err)
    }
}

exports.delete_share_comment = async (req, res, next ) => {
    try {
        await Share_comment.destroy({
            where : {id : req.params.id}
        })
        res.json({
            code : 200,
            message : '공유가 삭제되었습니다'
        })
    } catch (err) {
        console.error(err);
        next(err)
    }
}