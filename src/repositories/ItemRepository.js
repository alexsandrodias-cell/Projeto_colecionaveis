const Item = require("../models/Item");

class ItemRepository {

    async criar(dados) {
        return await Item.create(dados);
    }

    async buscarTodos() {
        return await Item.findAll({
            include: [
                {
                    association: "usuario",
                    attributes: ["id_usuario", "nome", "email"]
                }
            ]
        });
    }

    async buscarPorId(id) {
        return await Item.findByPk(id, {
            include: [
                {
                    association: "usuario",
                    attributes: ["id_usuario", "nome", "email"]
                }
            ]
        });
    }

    async atualizar(id, dados) {
        return await Item.update(
            dados,
            {
                where: {
                    id_item: id
                }
            }
        );
    }

    async excluir(id) {
        return await Item.destroy({
            where: {
                id_item: id
            }
        });
    }
}

module.exports = ItemRepository;