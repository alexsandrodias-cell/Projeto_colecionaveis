const express = require("express");


const usuarioRoutes =
    require("./routes/usuarioRoutes");

const itemRoutes =
    require("./routes/itemRoutes");

const authRoutes =
    require("./routes/authRoutes");

const swaggerUi =
    require("swagger-ui-express");

const swaggerSpec =
    require("./docs/swagger");

require("./models");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        mensagem: "Bem-vindo ao Acervo de Colecionáveis!"
    });
});

app.use("/usuarios", usuarioRoutes);
app.use("/itens", itemRoutes);
app.use("/auth", authRoutes);

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

app.use((erro, req, res, next) => {

    const status = erro.status || 500;

    const mensagem =
        erro.status
            ? erro.message
            : "Erro interno do servidor";

    if (!erro.status) {
        console.error(erro);
    }

    res.status(status).json({
        erro: mensagem
    });
});

module.exports = app;