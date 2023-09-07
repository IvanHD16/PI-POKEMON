const {DataTypes} = require('sequelize');
const axios = require('axios')

module.exports = (sequelize) => {
    sequelize.define('Type', {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombre:{
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {timestamps: false,
        freezeTableName: true})
}
