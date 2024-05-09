const Sequelize = require('sequelize');

class Temp extends Sequelize.Model {
    static initiate(sequelize) {
        Temp.init({
            category: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            temp_name: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            bodypart: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            calory: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            description: {
                type: Sequelize.STRING(255),
                allowNull: true,
            },
            img: {
                type: Sequelize.STRING(255),
                allowNull: true,
            },
            video: {
                type: Sequelize.STRING(255),
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