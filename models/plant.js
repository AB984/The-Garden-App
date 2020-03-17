module.exports = (sequelize, DataTypes) => {
    const Trefle = sequelize.define('plant', {
        owner: DataTypes.INTEGER,
        scientific_name: DataTypes.STRING,
        common_name: DataTypes.STRING,
        images: DataTypes.STRING,
        specifications: DataTypes.STRING
    });
    return Trefle;
};