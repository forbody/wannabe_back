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
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
    static associate(db) {
        db.Food.belongsToMany(db.User,  {through: 'Food_follow'} );
        db.Food.belongsToMany(db.Todo_element, { through: 'Ele_food' });
    }
};

module.exports = Food;