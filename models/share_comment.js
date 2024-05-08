const Sequelize = require('sequelize');

class Share_comment extends Sequelize.Model {
    static initiate(sequelize) {
        Share_comment.init({
            comment : {
                type : Sequelize.STRING(255),
                allowNull: true
            }
        }, {
            sequelize,
            paranoid: true,
            charset: "utf8",
            collate: "utf8_general_ci",
        });
    }
    static associate(db) {
        db.Share_comment.belongsTo(db.Todo_list);
        db.Share_comment.belongsToMany(db.User,{ through: 'Share_like' })
    }
};

module.exports = Share_comment;