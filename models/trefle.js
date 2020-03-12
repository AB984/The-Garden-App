module.exports = (sequelize, DataTypes) => {
    return sequelize.define('trefle', {
        owner: DataTypes.INTEGER,
        scientific_name: DataTypes.STRING,
        common_name: DataTypes.STRING,
        specifications: DataTypes.STRING
    });

};