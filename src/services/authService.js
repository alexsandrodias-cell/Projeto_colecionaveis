const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const UsuarioRepository =
    require("../repositories/UsuarioRepository");

const ErroApp = require("../utils/erroApp");

const usuarioRepository = new UsuarioRepository();

async function login(email, senha) {

    if (!email || !senha) {
        throw new ErroApp(
            "Informe e-mail e senha",
            400
        );
    }

    const usuario =
        await usuarioRepository.buscarPorEmail(email);

    if (!usuario) {
        throw new ErroApp(
            "E-mail ou senha incorretos",
            401
        );
    }

    const senhaValida =
        await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
        throw new ErroApp(
            "E-mail ou senha incorretos",
            401
        );
    }

    const token = jwt.sign(
        {
            id_usuario: usuario.id_usuario,
            email: usuario.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "2h"
        }
    );

    return {
        token,
        usuario: {
            id_usuario: usuario.id_usuario,
            nome: usuario.nome,
            email: usuario.email
        }
    };
}

module.exports = {
    login
};