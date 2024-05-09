const Sequelize = require('sequelize');

class Category extends Sequelize.Model {
    static initiate(sequelize) {
        Category.init({
            category_name: {
                type: Sequelize.STRING(50),
                allowNull: false,
                unique: true,
            },
            img : {
                type: Sequelize.STRING(255),
                allowNull: true,
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
        db.Category.hasMany(db.Exercise)
        db.Category.hasMany(db.Food)
    }
};

module.exports = Category;