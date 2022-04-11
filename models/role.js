

module.exports = (sequelize, Sequelize) => {

    const role = sequelize.define("role", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey : true         
        },
        name: {
            type: Sequelize.STRING,
            allowNull : false
        }
    });
    return role;
}