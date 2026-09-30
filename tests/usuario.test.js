require("dotenv").config();

const request = require("supertest");
const app = require("../src/app");

describe("API DE USUÁRIOS", () => {

    test("deve cadastrar um usuário", async () => {

        const resposta = await request(app)
            .post("/usuarios")
            .send({
                nome: "Usuário Teste",
                email: `teste${Date.now()}@email.com`,
                senha: "123456",
                telefone: "(83) 99999-9999"
            });

        expect(resposta.statusCode).toBe(201);

        expect(resposta.body).toHaveProperty("id_usuario");
        expect(resposta.body.nome).toBe("Usuário Teste");
        expect(resposta.body.email).toContain("@email.com");
        expect(resposta.body).not.toHaveProperty("senha");
    });


    test("não deve cadastrar usuário sem nome", async () => {

        const resposta = await request(app)
            .post("/usuarios")
            .send({
                email: `semnome${Date.now()}@email.com`,
                senha: "123456"
            });

        expect(resposta.statusCode).toBe(400);
    });


    test("não deve cadastrar usuário com e-mail duplicado", async () => {

        const email = `duplicado${Date.now()}@email.com`;

        await request(app)
            .post("/usuarios")
            .send({
                nome: "Primeiro Usuário",
                email: email,
                senha: "123456"
            });

        const resposta = await request(app)
            .post("/usuarios")
            .send({
                nome: "Segundo Usuário",
                email: email,
                senha: "123456"
            });

        expect(resposta.statusCode).toBe(409);
    });


    test("deve listar os usuários", async () => {

        const resposta = await request(app)
            .get("/usuarios");

        expect(resposta.statusCode).toBe(200);
        expect(Array.isArray(resposta.body)).toBe(true);
    });


    test("deve buscar um usuário pelo ID", async () => {

        const cadastro = await request(app)
            .post("/usuarios")
            .send({
                nome: "Usuário Busca",
                email: `busca${Date.now()}@email.com`,
                senha: "123456"
            });

        const id = cadastro.body.id_usuario;

        const resposta = await request(app)
            .get(`/usuarios/${id}`);

        expect(resposta.statusCode).toBe(200);
        expect(resposta.body.id_usuario).toBe(id);
        expect(resposta.body.nome).toBe("Usuário Busca");
        expect(resposta.body).not.toHaveProperty("senha");
    });


    test("deve retornar 404 ao buscar usuário inexistente", async () => {

        const resposta = await request(app)
            .get("/usuarios/999999");

        expect(resposta.statusCode).toBe(404);
    });


    test("deve atualizar um usuário", async () => {

        const email = `atualizar${Date.now()}@email.com`;

        const cadastro = await request(app)
            .post("/usuarios")
            .send({
                nome: "Usuário Original",
                email: email,
                senha: "123456"
            });

        const id = cadastro.body.id_usuario;

        const login = await request(app)
            .post("/auth/login")
            .send({
                email: email,
                senha: "123456"
            });

        expect(login.statusCode).toBe(200);

        const token = login.body.token;

        const resposta = await request(app)
            .put(`/usuarios/${id}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                nome: "Usuário Atualizado",
                email: email,
                senha: "654321",
                telefone: "(83) 98888-7777"
            });

        expect(resposta.statusCode).toBe(200);
        expect(resposta.body.nome).toBe("Usuário Atualizado");
        expect(resposta.body.telefone).toBe("(83) 98888-7777");
        expect(resposta.body).not.toHaveProperty("senha");
    });


    test("deve excluir um usuário", async () => {

        const email = `excluir${Date.now()}@email.com`;

        const cadastro = await request(app)
            .post("/usuarios")
            .send({
                nome: "Usuário Excluir",
                email: email,
                senha: "123456"
            });

        const id = cadastro.body.id_usuario;

        const login = await request(app)
            .post("/auth/login")
            .send({
                email: email,
                senha: "123456"
            });

        expect(login.statusCode).toBe(200);

        const token = login.body.token;

        const resposta = await request(app)
            .delete(`/usuarios/${id}`)
            .set("Authorization", `Bearer ${token}`);

        expect(resposta.statusCode).toBe(204);
    });

});