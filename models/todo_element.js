const Sequelize = require('sequelize');

class Todo_element extends Sequelize.Model {
    static initiate(sequelize) {
        Todo_element.init({
            element_name: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            achieve : {
                type : Sequelize.BOOLEAN,
                defaultValue : false
            },
            order : {
                type : Sequelize.INTEGER,
                defaultValue : false
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
        db.Todo_element.belongsTo(db.User);
        db.Todo_element.belongsToMany(db.Todo_list,{ through: 'List_elem' })
        db.Todo_element.belongsToMany(db.Exercise,{ through: 'Ele-exercise' })
        db.Todo_element.belongsToMany(db.Food,{ through: 'Ele-food' })
    }
};

module.exports = Todo_element;