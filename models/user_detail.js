const Sequelize = require('sequelize');

class User_detail extends Sequelize.Model {
    static initiate(sequelize) {
        User_detail.init({
            height: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            weight: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            bmi: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            bodyshape: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            rec_cal : {
                type: Sequelize.INTEGER,
                allowNull: false,
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