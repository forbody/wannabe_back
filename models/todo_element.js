const Sequelize = require('sequelize');

class Todo_element extends Sequelize.Model {
    static initiate(sequelize) {
        Todo_element.init({
            category_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            todo_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            achieve : {
                type : Sequelize.BOOLEAN,
                defaultValue : false
            },
            date : {
                type : Sequelize.DATEONLY,
                allowNull: false,
            },
            recur : {
                type : Sequelize.BOOLEAN,
                defaultValue : false
            },
            order : {
                type : Sequelize.INTEGER,
                defaultValue : false
            },
            sets : {
                type : Sequelize.INTEGER,
                allowNull: true,
                defaultValue : false
            },
            reps : {
                type : Sequelize.INTEGER,
                allowNull: true,
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
        db.Todo_element.belongsToMany(db.Exercise,{ through: 'Ele_exercise' })
        db.Todo_element.belongsToMany(db.Food,{ through: 'Ele_food' })
        db.Todo_element.belongsToMany(db.Todo_recur,  {through: 'List_recur'})
    }
};

module.exports = Todo_element;