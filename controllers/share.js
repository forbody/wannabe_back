const { Share_comment } = require('../models');

exports.upload_todo_list = async (req, res, next) => {
    try {
        await Share_comment.create({
            comment : req.body.comment,
            TodoListId : req.params.id
        })
        res.json({
            code : 200,
            message : '공유가 완료되었습니다'
        })
    } catch (err) {
        console.error(err);
        next(err)
    }
}


exports.modify_share_comment = async (req, res, next) => {
    try {
        // 프론트 쪽에서 todo_list_id로 user비교해야하나???
        // get_todo_list 를 이용하여 로그인 유저가 맞는지??확인해야하나..????
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
        // 프론트 쪽에서 todo_list_id로 user비교해야하나???
        // get_todo_list 를 이용하여 로그인 유저가 맞는지??확인해야하나..????
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