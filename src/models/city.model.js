module.exports = (sequelize, DataTypes) => {

    const Citie = sequelize.define("citie", {
        city_code: {
            type: DataTypes.STRING(100), allowNull: false
        },
        city_name: {
            type: DataTypes.STRING(100), allowNull: false
        },
        state_id: {
            type: DataTypes.INTEGER(11), allowNull: false
        }, 
        country_id: {
            type: DataTypes.INTEGER(11), allowNull: false
        },
        status: {
            type: DataTypes.ENUM('Active', 'Inactive'),defaultValue:'Active', allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE, allowNull: false
        },
        updatedAt: {
            type: DataTypes.DATE, allowNull: false
        },
        deletedAt: {
            type: DataTypes.DATE, allowNull: true
        }
    })

    return Citie

}