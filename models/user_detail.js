const Sequelize = require('sequelize');

class User_detail extends Sequelize.Model {
    static initiate(sequelize) {
        User_detail.init({
            gender: {
                type: Sequelize.ENUM("M", "F"),
                allowNull: true,
            },
            birthday: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            height: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            weight: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            bmi: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            bodyshape: {
                type: Sequelize.STRING(50),
                allowNull: true,
            }
        }, {
            sequelize,
            paranoid: true,
            underscored: true, // false
            charset: "utf8",
            collate: "utf8_general_ci",
        });
    }
    static associate(db) {
        db.User_detail.hasOne(db.User);
    }
};

module.exports = User_detail;