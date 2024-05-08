const Sequelize = require('sequelize');

class Exercise extends Sequelize.Model {
    static initiate(sequelize) {
        Exercise.init({
            // CREATE TABLE `exercise` (
            //     `exerciseId`	INT	NOT NULL,
            //     `exercise_name`	VARCHAR(50)	NULL,
            //     `exercise_sort`	VARCHAR(255)	NULL,
            //     `description`	VARCHAR(255)	NULL,
            //     `img`	VARCHAR(255)	NULL,
            //     `video`	VARCHAR(255)	NULL,
            //     `createAt`	DATETIME	NOT NULL	DEFAULT NOW,
            //     `updateAt`	DATETIME	NOT NULL	DEFAULT NOW,
            //     `deleteAt`	DATETIME	NULL
            // );
            exercise_name: {
                // type, allowNull, unique ...
                type: Sequelize.STRING(100),
                allowNull: false,
                unique: true,
            }
        }, {
            sequelize,
            // 240405 models/user.js
            charset: "utf8",
            collate: "utf8_general_ci"
        });
    }
    static associate(db) {
        // 교안 참곡

        // 다대다 연결테이블 자동생성 240423/node_back/models/user.js-user.js post.js-hashtag.js (through) 
    }
};

module.exports = Exercise;