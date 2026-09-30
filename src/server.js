require("dotenv").config();

const app = require("./app");
const sequelize = require("./config/database");

// Carrega os modelos e registra os relacionamentos
require("./models");

const PORT = process.env.PORT || 3000;

async function iniciarServidor() {
    try {
        await sequelize.authenticate();

        console.log("Banco de dados conectado.");

        await sequelize.sync();

        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });

    } catch (error) {
        console.error(
            "Erro ao iniciar o servidor:",
            error.message
        );
    }
}

iniciarServidor();