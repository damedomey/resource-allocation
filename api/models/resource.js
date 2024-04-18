const sequelize = require('../config/database');
const { Sequelize, Model, DataTypes} = require("sequelize");

const Resource = sequelize.define('resource', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    capacity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    size: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    startTime: {
        type: DataTypes.TIME,
        allowNull: false
    },
    endTime: {
        type: DataTypes.TIME,
        allowNull: false
    },
    isAccessible: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
});

module.exports = Resource;
