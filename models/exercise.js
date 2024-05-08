const Sequelize = require('sequelize');

class Exercise extends Sequelize.Model {
    static initiate(sequelize) {
        Exercise.init({
            //column
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
        }, {
            sequelize,

        });
    }
    static associate(db) {

    }
};

module.exports = Exercise;