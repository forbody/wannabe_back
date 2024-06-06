const Sequelize = require('sequelize');

class Temp extends Sequelize.Model {
    static initiate(sequelize) {
        Temp.init({
            description: {
                type: Sequelize.TEXT,
                allowNull: true,
            }
        }, {
            sequelize,
            paranoid: true,
            underscored: true, // false
            charset: "utf8",
            collate: "utf8_general_ci",
        });
    }
    static associate(db) {

    }
};

module.exports = Temp;