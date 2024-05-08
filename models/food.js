const Sequelize = require('sequelize');

class Food extends Sequelize.Model {
    static initiate(sequelize) {
        Food.init({
            food_id: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
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
        // ERD 보고 써보려했는데(+강사님 자료 참고) 확실하게 하고싶어서 비워놨습니다,,
        db.Food
        db.Ele_food
    }
};

module.exports = Food;