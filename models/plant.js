module.exports = (sequelize, DataTypes) => {
    return sequelize.define('plants', {
        owner: DataTypes.INTEGER,
        scientific_name: DataTypes.STRING,
        common_name: DataTypes.STRING,
        specifications: DataTypes.STRING
    });

};