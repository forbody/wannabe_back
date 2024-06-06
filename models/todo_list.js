const Sequelize = require('sequelize');

class Todo_list extends Sequelize.Model {
    static initiate(sequelize) {
        Todo_list.init({
            title: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            share : {
                type : Sequelize.BOOLEAN,
                defaultValue : false
            },
            date : {
                type : Sequelize.DATEONLY,
                allowNull: false,
            },
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
        db.Todo_list.belongsToMany(db.User, {as: 'ListRecommend',  through: 'List_follow' });
        db.Todo_list.belongsToMany(db.Todo_element,{ through: 'List_elem' })
    }
};

module.exports = Todo_list;