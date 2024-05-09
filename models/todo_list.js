const Sequelize = require('sequelize');

class Todo_list extends Sequelize.Model {
    static initiate(sequelize) {
        Todo_list.init({
            title: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            share : {
                type : Sequelize.BOOLEAN,
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
        db.Todo_list.hasMany(db.Share_comment);
        db.Todo_list.belongsToMany(db.User,{ through: 'List_user' })
        db.Todo_list.belongsToMany(db.Todo_element,{ through: 'List_elem' })
    }
};

module.exports = Todo_list;