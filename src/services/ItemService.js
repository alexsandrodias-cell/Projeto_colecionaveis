const ErroApp = require("../utils/erroApp");

class ItemService {

    constructor(repository) {
        this.repository = repository;
    }

    async criar(dados) {
        const {
            nome,
            foto,
            categoria,
            descricao,
            status,
            id_usuario
        } = dados;

        if (!nome || !categoria || !status || !id_usuario) {
            throw new ErroApp(
                "Nome, categoria, status e usuário são obrigatórios",
                400
            );
        }

        return await this.repository.criar({
            nome,
            foto,
            categoria,
            descricao,
            status,
            id_usuario
        });
    }

    async buscarTodos() {
        return await this.repository.buscarTodos();
    }

    async buscarPorId(id) {
        return await this.repository.buscarPorId(id);
    }

    async atualizar(id, dados) {
        return await this.repository.atualizar(id, dados);
    }

    async excluir(id) {
        return await this.repository.excluir(id);
    }
}

module.exports = ItemService;