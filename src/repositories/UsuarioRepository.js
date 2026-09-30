const Usuario = require("../models/Usuario");

class UsuarioRepository {

    async criar(dados) {
        return await Usuario.create(dados);
    }

    async buscarTodos() {
        return await Usuario.findAll({
            attributes: {
                exclude: ["senha"]
            }
        });
    }

    async buscarPorId(id) {
        return await Usuario.findByPk(id, {
            attributes: {
                exclude: ["senha"]
            }
        });
    }

    async buscarPorEmail(email) {
        return await Usuario.findOne({
            where: { email }
        });
    }

    async atualizar(id, dados) {
        return await Usuario.update(
            dados,
            {
                where: {
                    id_usuario: id
                }
            }
        );
    }

    async excluir(id) {
        return await Usuario.destroy({
            where: {
                id_usuario: id
            }
        });
    }
}

module.exports = UsuarioRepository;