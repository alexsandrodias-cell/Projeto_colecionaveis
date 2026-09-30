const express = require("express");

const UsuarioRepository = require("../repositories/UsuarioRepository");
const UsuarioService = require("../services/UsuarioService");
const UsuarioController = require("../controllers/UsuarioController");
const autenticar = require("../middlewares/autenticacao");

const router = express.Router();

const repository = new UsuarioRepository();
const service = new UsuarioService(repository);
const controller = new UsuarioController(service);

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Cadastrar um novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       201:
 *         description: Usuário cadastrado com sucesso
 *       400:
 *         description: Dados inválidos
 *       409:
 *         description: E-mail já cadastrado
 */
router.post("/", (req, res) => controller.criar(req, res));

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Listar todos os usuários
 *     tags: [Usuários]
 *     responses:
 *       200:
 *         description: Lista de usuários
 */
router.get("/", (req, res) => controller.buscarTodos(req, res));

/**
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     summary: Buscar um usuário pelo ID
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *       404:
 *         description: Usuário não encontrado
 */
router.get("/:id", (req, res) => controller.buscarPorId(req, res));

/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     summary: Atualizar um usuário
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Token inválido ou não informado
 *       404:
 *         description: Usuário não encontrado
 *       409:
 *         description: E-mail já cadastrado
 */
router.put("/:id", autenticar, (req, res) => controller.atualizar(req, res));

/**
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     summary: Excluir um usuário
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       204:
 *         description: Usuário excluído com sucesso
 *       401:
 *         description: Token inválido ou não informado
 *       404:
 *         description: Usuário não encontrado
 */
router.delete("/:id", autenticar, (req, res) => controller.excluir(req, res));

module.exports = router;