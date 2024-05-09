const Sequelize = require('sequelize');

class Exercise extends Sequelize.Model {
    static initiate(sequelize) {
        Exercise.init({
            name: {
                type: Sequelize.STRING(50),
                allowNull: false,
                unique: true,
            },
            sort : {
                type: Sequelize.STRING(50),
                allowNull: false,
                unique: true,
            },
            description : {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            img : {
                type: Sequelize.STRING(255),
                allowNull: true,
            },
            url : {
                type: Sequelize.STRING(255),
                allowNull: true,
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
        db.Exercise.belongsToMany(db.User, {  through: 'Exercise_follow' });
        db.Exercise.belongsToMany(db.Todo_element, {  through: 'Ele_exercise' });
        db.Exercise.belongsTo(db.Category);
    }
};

module.exports = Exercise;