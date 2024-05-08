const Sequelize = require('sequelize');

class Todo_list extends Sequelize.Model {
    static initiate(sequelize) {
        Todo_list.init({
            title: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            date : {
                type : Sequelize.DATE,
                allowNull: false,
            },
            recur : {
                type : Sequelize.BOOLEAN,
                defaultValue : false
            },
            share : {
                type : Sequelize.BOOLEAN,
                defaultValue : false
            }
        }, {
            sequelize,
            paranoid: true,
            charset: "utf8",
            collate: "utf8_general_ci",
        });
    }
    static associate(db) {
        db.Todo_list.hasMany(db.Share_comment);
        db.Todo_list.belongsToMany(db.User,{ through: 'List_user' })
        db.Todo_list.belongsToMany(db.Todo_element,{ through: 'List_elem' })
        db.Todo_list.belongsToMnay(db.Todo_recur,  {through: 'List_recur'})
    }
};

module.exports = Todo_list;