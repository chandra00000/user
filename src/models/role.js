module.exports = (sequelize, DataTypes) => {

    const Role = sequelize.define("role", {
        name: { type: DataTypes.STRING, allowNull: true },
        user_type_id: { type: DataTypes.INTEGER, allowNull: true },
        description: { type: DataTypes.STRING, allowNull: false },

        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true
        }

    })





    return Role

}