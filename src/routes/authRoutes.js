const express = require("express");
const authService = require("../services/authService");

const router = express.Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Realiza login do usuário
 *     tags:
 *       - Autenticação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       400:
 *         description: E-mail ou senha não informados
 *       401:
 *         description: E-mail ou senha incorretos
 */
router.post("/login", async (req, res) => {
    try {
        const { email, senha } = req.body;

        const resultado =
            await authService.login(email, senha);

        return res.status(200).json(resultado);

    } catch (error) {
        return res.status(
            error.status || 500
        ).json({
            erro: error.message
        });
    }
});

module.exports = router;