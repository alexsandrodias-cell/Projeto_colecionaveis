const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",

        info: {
            title: "API Acervo de Colecionáveis",
            version: "1.0.0",
            description: "API para gerenciamento de usuários e itens colecionáveis"
        },

        servers: [
            {
                url: "http://localhost:3000",
                description: "Servidor local"
            }
        ],

        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            },

            schemas: {
                Usuario: {
                    type: "object",
                    properties: {
                        id_usuario: {
                            type: "integer",
                            example: 1
                        },
                        nome: {
                            type: "string",
                            example: "João Silva"
                        },
                        email: {
                            type: "string",
                            format: "email",
                            example: "joao@email.com"
                        },
                        senha: {
                            type: "string",
                            example: "123456"
                        },
                        telefone: {
                            type: "string",
                            example: "(83) 99999-9999"
                        },
                        data_cadastro: {
                            type: "string",
                            format: "date-time"
                        }
                    }
                },

                Item: {
                    type: "object",
                    properties: {
                        id_item: {
                            type: "integer",
                            example: 1
                        },
                        nome: {
                            type: "string",
                            example: "Boneco do Homem-Aranha"
                        },
                        foto: {
                            type: "string",
                            example: "homem-aranha.jpg"
                        },
                        categoria: {
                            type: "string",
                            example: "Action Figure"
                        },
                        descricao: {
                            type: "string",
                            example: "Boneco colecionável do Homem-Aranha"
                        },
                        status: {
                            type: "string",
                            example: "Disponível"
                        },
                        data_cadastro: {
                            type: "string",
                            format: "date-time"
                        },
                        id_usuario: {
                            type: "integer",
                            example: 1
                        }
                    }
                },

                Login: {
                    type: "object",
                    required: [
                        "email",
                        "senha"
                    ],
                    properties: {
                        email: {
                            type: "string",
                            format: "email",
                            example: "joao@email.com"
                        },
                        senha: {
                            type: "string",
                            example: "123456"
                        }
                    }
                }
            }
        }
    },

    apis: ["./src/routes/*.js"]
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;