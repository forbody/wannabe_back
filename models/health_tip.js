const Sequelize = require('sequelize');

class health_tip extends Sequelize.Model {
    static initiate(sequelize) {
        health_tip.init({
            health_tip : {
                type : Sequelize.STRING(255),
                allowNull: true
            }
        }, {
            sequelize,
            paranoid: true,
            underscored: true,
            charset: "utf8",
            collate: "utf8_general_ci",
        });
    }
    static associate(db) {
        
    }
};

module.exports = health_tip;