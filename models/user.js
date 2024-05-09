const Sequelize = require('sequelize');

class User extends Sequelize.Model {
    static initiate(sequelize) {
        User.init({
            email: {
                type: Sequelize.STRING(50),
                allowNull: true,
                unique: true, // 중복 안되는 값으로 설정해서 이후 유저 이메일로 비밀번호 찾을 수 있게 할 예정
            },
            user_name: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            password: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            provider: {
                type: Sequelize.ENUM("local", "kakao"),
                allowNull: false,
                defaultValue: "local",
            },
            kakao_id: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            grade: {
                type: Sequelize.STRING(50),
                allowNull: false,
                defaultValue: "normal",
            },
            refresh_token: {
                type: Sequelize.STRING(255),
                allowNull: true,
            }
        }, {
            sequelize,
            paranoid: true, // deletedAt (false)
            timestamps: true, // created, updated (true)
            underscored: true, // false
            charset: "utf8",
            collate: "utf8_general_ci",
        });
    }
    static associate(db) {
        db.User.hasOne(db.User_detail);
        db.User.hasMany(db.Todo_element);
        db.User.belongsToMany(db.Todo_list, { through: 'List_user' });
        db.User.belongsToMany(db.Share_comment, { foreignKey: 'user_id', through: 'Share_like' });
        db.User.belongsToMany(db.Exercise, { foreignKey: 'user_id', through: 'Exercise_follow' });
        db.User.belongsToMany(db.Food, { foreignKey: 'user_id', through: 'Food_follow' });
        db.User.belongsToMany(db.User, { foreignKey: 'user_id', as: 'Celebrities', through: 'User_like' });
        db.User.belongsToMany(db.User, { foreignKey: 'celebrity_id', as: 'Users', through: 'User_like' });
    }
};

module.exports = User;