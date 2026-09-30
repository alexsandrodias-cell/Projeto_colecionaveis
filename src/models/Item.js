const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Item = sequelize.define(
    "Item",
    {
        id_item: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },

        foto: {
            type: DataTypes.STRING,
            allowNull: true
        },

        categoria: {
            type: DataTypes.STRING,
            allowNull: false
        },

        descricao: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        status: {
            type: DataTypes.STRING,
            allowNull: false
        },

        data_cadastro: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },

        id_usuario: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: "itens",
        timestamps: false
    }
);

module.exports = Item;