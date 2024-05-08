const Sequelize = require('sequelize');

class Food_follow extends Sequelize.Model {
    static initiate(sequelize) {
        Food_follow.init({
            user_id:{
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            food_id:{
                type: Sequelize.INTEGER,
                allowNull: false,
            }
        }, {
            sequelize,

        });
    }
    static associate(db) {

    }
};

module.exports = Food_follow;