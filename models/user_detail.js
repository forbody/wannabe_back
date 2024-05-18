const Sequelize = require('sequelize');

class User_detail extends Sequelize.Model {
    static initiate(sequelize) {
        User_detail.init({
            height: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            weight: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            bmi: {
                type: Sequelize.FLOAT,
                allowNull: true,
            },
            bodyshape: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            rec_cal : {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            img : {
                type: Sequelize.STRING(255),
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
        db.User_detail.belongsTo(db.User);
    }
};

module.exports = User_detail;