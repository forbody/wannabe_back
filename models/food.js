const Sequelize = require('sequelize');

class Food extends Sequelize.Model {
    static initiate(sequelize) {
        Food.init({
            food_name: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            img: {
                type: Sequelize.STRING(255),
                allowNull: true,
            },
            calory: {
                type: Sequelize.INTEGER,
                allowNull: false,
            }
        }, {
            sequelize,
            paranoid: true, // deletedAt (false)
            timestamps: true, // created, updated (true)
            underscored: true, // false
            charset: "utf8",
            collate: "utf8_general_ci"
        });
    }
    static associate(db) {
        db.Food.belongsToMany(db.User,  {through: 'Food_follow'} );
        db.Food.belongsToMany(db.Todo_element, { through: 'Ele_food' });
        db.Food.belongsTo(db.Category);
    }
};

module.exports = Food;