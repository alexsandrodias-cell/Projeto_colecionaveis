require("dotenv").config();

const request = require("supertest");
const app = require("../src/app");

describe("API DE ITENS", () => {

    // --------------------------------------------------
    // AUTENTICAÇÃO
    // --------------------------------------------------

    test("não deve cadastrar item sem token", async () => {

        const resposta = await request(app)
            .post("/itens")
            .send({
                nome: "Item Teste",
                categoria: "Action Figure",
                descricao: "Item para teste",
                status: "Disponível"
            });

        expect(resposta.statusCode).toBe(401);
    });


    // --------------------------------------------------
    // CADASTRO
    // --------------------------------------------------

    test("deve cadastrar um item", async () => {

        const email = `item${Date.now()}@email.com`;

        // Cria usuário
        await request(app)
            .post("/usuarios")
            .send({
                nome: "Usuário Item",
                email: email,
                senha: "123456"
            });

        // Faz login
        const login = await request(app)
            .post("/auth/login")
            .send({
                email: email,
                senha: "123456"
            });

        expect(login.statusCode).toBe(200);

        const token = login.body.token;

        // Cadastra item
        const resposta = await request(app)
            .post("/itens")
            .set("Authorization", `Bearer ${token}`)
            .send({
                nome: "Boneco Teste",
                foto: "boneco.jpg",
                categoria: "Action Figure",
                descricao: "Boneco utilizado nos testes",
                status: "Disponível"
            });

        console.log("RESPOSTA CADASTRO ITEM:", resposta.statusCode, resposta.body);    
        expect(resposta.statusCode).toBe(201);

        expect(resposta.body).toHaveProperty("id_item");
        expect(resposta.body.nome).toBe("Boneco Teste");
        expect(resposta.body.categoria).toBe("Action Figure");
    });


    test("não deve cadastrar item sem dados obrigatórios", async () => {

        const email = `itemdados${Date.now()}@email.com`;

        await request(app)
            .post("/usuarios")
            .send({
                nome: "Usuário Dados",
                email: email,
                senha: "123456"
            });

        const login = await request(app)
            .post("/auth/login")
            .send({
                email: email,
                senha: "123456"
            });

        const token = login.body.token;

        const resposta = await request(app)
            .post("/itens")
            .set("Authorization", `Bearer ${token}`)
            .send({});

        expect(resposta.statusCode).toBe(400);
    });


    // --------------------------------------------------
    // LISTAGEM
    // --------------------------------------------------

    test("deve listar os itens", async () => {

        const resposta = await request(app)
            .get("/itens");

        expect(resposta.statusCode).toBe(200);
        expect(Array.isArray(resposta.body)).toBe(true);
    });


    // --------------------------------------------------
    // BUSCA POR ID
    // --------------------------------------------------

    test("deve buscar um item pelo ID", async () => {

        const email = `buscaitem${Date.now()}@email.com`;

        await request(app)
            .post("/usuarios")
            .send({
                nome: "Usuário Busca Item",
                email: email,
                senha: "123456"
            });

        const login = await request(app)
            .post("/auth/login")
            .send({
                email: email,
                senha: "123456"
            });

        const token = login.body.token;

        const cadastro = await request(app)
            .post("/itens")
            .set("Authorization", `Bearer ${token}`)
            .send({
                nome: "Item Busca",
                categoria: "Colecionável",
                descricao: "Item para busca",
                status: "Disponível"
            });

        const id = cadastro.body.id_item;

        const resposta = await request(app)
            .get(`/itens/${id}`);

        expect(resposta.statusCode).toBe(200);
        expect(resposta.body.id_item).toBe(id);
        expect(resposta.body.nome).toBe("Item Busca");
    });


    test("deve retornar 404 ao buscar item inexistente", async () => {

        const resposta = await request(app)
            .get("/itens/999999");

        expect(resposta.statusCode).toBe(404);
    });


    // --------------------------------------------------
    // ATUALIZAÇÃO
    // --------------------------------------------------

    test("deve atualizar um item", async () => {

        const email = `atualizaritem${Date.now()}@email.com`;

        await request(app)
            .post("/usuarios")
            .send({
                nome: "Usuário Atualizar Item",
                email: email,
                senha: "123456"
            });

        const login = await request(app)
            .post("/auth/login")
            .send({
                email: email,
                senha: "123456"
            });

        const token = login.body.token;

        const cadastro = await request(app)
            .post("/itens")
            .set("Authorization", `Bearer ${token}`)
            .send({
                nome: "Item Original",
                categoria: "Action Figure",
                descricao: "Descrição original",
                status: "Disponível"
            });

        const id = cadastro.body.id_item;

        const resposta = await request(app)
            .put(`/itens/${id}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                nome: "Item Atualizado",
                categoria: "Action Figure",
                descricao: "Descrição atualizada",
                status: "Indisponível"
            });

        expect(resposta.statusCode).toBe(200);
        expect(resposta.body.nome).toBe("Item Atualizado");
        expect(resposta.body.status).toBe("Indisponível");
    });


    // --------------------------------------------------
    // EXCLUSÃO
    // --------------------------------------------------

    test("deve excluir um item", async () => {

        const email = `excluiritem${Date.now()}@email.com`;

        await request(app)
            .post("/usuarios")
            .send({
                nome: "Usuário Excluir Item",
                email: email,
                senha: "123456"
            });

        const login = await request(app)
            .post("/auth/login")
            .send({
                email: email,
                senha: "123456"
            });

        const token = login.body.token;

        const cadastro = await request(app)
            .post("/itens")
            .set("Authorization", `Bearer ${token}`)
            .send({
                nome: "Item Excluir",
                categoria: "Colecionável",
                descricao: "Item para exclusão",
                status: "Disponível"
            });

        const id = cadastro.body.id_item;

        const resposta = await request(app)
            .delete(`/itens/${id}`)
            .set("Authorization", `Bearer ${token}`);

        expect(resposta.statusCode).toBe(204);
    });

});