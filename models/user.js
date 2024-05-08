const Sequelize = require('sequelize');

class User extends Sequelize.Model {
    static initiate(sequelize) {
        User.init({

        }, {
            sequelize,

        });
    }
    static associate(db) {

    }
};

module.exports = User;