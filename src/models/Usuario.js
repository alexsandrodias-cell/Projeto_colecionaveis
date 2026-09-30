const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Usuario = sequelize.define(
    "Usuario",
    {
        id_usuario: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },

        senha: {
            type: DataTypes.STRING,
            allowNull: false
        },

        telefone: {
            type: DataTypes.STRING,
            allowNull: true
        },

        data_cadastro: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    },
    {
        tableName: "usuarios",
        timestamps: false
    }
);

module.exports = Usuario;