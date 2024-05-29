const Sequelize = require('sequelize');

class Health_tip extends Sequelize.Model {
    static initiate(sequelize) {
        Health_tip.init({
            health_tip : {
                type : Sequelize.TEXT,
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
        db.Health_tip.belongsToMany(db.Exercise ,{through: 'ExerciseHealthTip'})
    }
};

module.exports = Health_tip;