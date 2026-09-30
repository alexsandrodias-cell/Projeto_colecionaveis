const bcrypt = require("bcrypt");
const ErroApp = require("../utils/erroApp");

class UsuarioService {

    constructor(repository) {
        this.repository = repository;
    }

    async criar(dados) {
        const { nome, email, senha, telefone } = dados;

        if (!nome || !email || !senha) {
            throw new ErroApp(
                "Nome, e-mail e senha são obrigatórios",
                400
            );
        }

        const usuarioExistente =
            await this.repository.buscarPorEmail(email);

        if (usuarioExistente) {
            throw new ErroApp(
                "E-mail já cadastrado",
                409
            );
        }

        const senhaCriptografada =
            await bcrypt.hash(senha, 10);

        const usuario = await this.repository.criar({
            nome,
            email,
            senha: senhaCriptografada,
            telefone
        });

        const usuarioSemSenha = usuario.toJSON();
        delete usuarioSemSenha.senha;

        return usuarioSemSenha;
    }

    async buscarTodos() {
        return await this.repository.buscarTodos();
    }

    async buscarPorId(id) {
        return await this.repository.buscarPorId(id);
    }

    async atualizar(id, dados) {
        if (dados.senha) {
            dados.senha = await bcrypt.hash(dados.senha, 10);
        }

        const resultado =
            await this.repository.atualizar(id, dados);

        return resultado;
    }

    async excluir(id) {
        return await this.repository.excluir(id);
    }
}

module.exports = UsuarioService;