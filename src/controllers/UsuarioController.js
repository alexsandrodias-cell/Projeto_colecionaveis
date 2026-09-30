class UsuarioController {

    constructor(service) {
        this.service = service;
    }

    async criar(req, res) {
        try {
            const usuario =
                await this.service.criar(req.body);

            return res.status(201).json(usuario);

        } catch (error) {
            return res.status(
                error.status || 400
            ).json({
                erro: error.message
            });
        }
    }

    async buscarTodos(req, res) {
        try {
            const usuarios =
                await this.service.buscarTodos();

            return res.status(200).json(usuarios);

        } catch (error) {
            return res.status(500).json({
                erro: error.message
            });
        }
    }

    async buscarPorId(req, res) {
        try {
            const usuario =
                await this.service.buscarPorId(
                    req.params.id
                );

            if (!usuario) {
                return res.status(404).json({
                    erro: "Usuário não encontrado"
                });
            }

            return res.status(200).json(usuario);

        } catch (error) {
            return res.status(500).json({
                erro: error.message
            });
        }
    }

    async atualizar(req, res) {
        try {
            const resultado =
                await this.service.atualizar(
                    req.params.id,
                    req.body
                );

            if (resultado[0] === 0) {
                return res.status(404).json({
                    erro: "Usuário não encontrado"
                });
            }

            const usuario =
                await this.service.buscarPorId(
                    req.params.id
                );

            return res.status(200).json(usuario);

        } catch (error) {
            return res.status(
                error.status || 400
            ).json({
                erro: error.message
            });
        }
    }

    async excluir(req, res) {
        try {
            const resultado =
                await this.service.excluir(
                    req.params.id
                );

            if (resultado === 0) {
                return res.status(404).json({
                    erro: "Usuário não encontrado"
                });
            }

            return res.status(204).send();

        } catch (error) {
            return res.status(500).json({
                erro: error.message
            });
        }
    }
}

module.exports = UsuarioController;