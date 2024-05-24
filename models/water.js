const Sequelize = require('sequelize');

class Water extends Sequelize.Model {
    static initiate(sequelize) {
        Water.init({
            water : {
                type : Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
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
        db.Water.belongsTo(db.User);
    }
};

module.exports = Water;