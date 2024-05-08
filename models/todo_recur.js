const Sequelize = require('sequelize');

class Todo_recur extends Sequelize.Model {
    static initiate(sequelize) {
        Todo_recur.init({
            day_name: {
                type : Sequelize.STRING(10),
                allowNull : false,
                unique : true
            }
        }, {
            sequelize,
            paranoid: true,
            charset: "utf8",
            collate: "utf8_general_ci",
        });
    }
    static associate(db) {
        db.Todo_recur.belongsToMnay(db.Todo_list,  {through: 'List_recur'})
    }
};

module.exports = Todo_recur;