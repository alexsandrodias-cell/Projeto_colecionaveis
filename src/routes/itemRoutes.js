const express = require("express");

const ItemRepository = require("../repositories/ItemRepository");
const ItemService = require("../services/ItemService");
const ItemController = require("../controllers/ItemController");
const autenticar = require("../middlewares/autenticacao");

const router = express.Router();

const repository = new ItemRepository();
const service = new ItemService(repository);
const controller = new ItemController(service);

/**
 * @swagger
 * /itens:
 *   post:
 *     summary: Cadastrar um novo item
 *     tags: [Itens]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       201:
 *         description: Item cadastrado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Token inválido ou não informado
 */
router.post("/", autenticar, (req, res) => controller.criar(req, res));

/**
 * @swagger
 * /itens:
 *   get:
 *     summary: Listar todos os itens
 *     tags: [Itens]
 *     responses:
 *       200:
 *         description: Lista de itens
 */
router.get("/", (req, res) => controller.buscarTodos(req, res));

/**
 * @swagger
 * /itens/{id}:
 *   get:
 *     summary: Buscar um item pelo ID
 *     tags: [Itens]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do item
 *     responses:
 *       200:
 *         description: Item encontrado
 *       404:
 *         description: Item não encontrado
 */
router.get("/:id", (req, res) => controller.buscarPorId(req, res));

/**
 * @swagger
 * /itens/{id}:
 *   put:
 *     summary: Atualizar um item
 *     tags: [Itens]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       200:
 *         description: Item atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Token inválido ou não informado
 *       404:
 *         description: Item não encontrado
 */
router.put("/:id", autenticar, (req, res) => controller.atualizar(req, res));

/**
 * @swagger
 * /itens/{id}:
 *   delete:
 *     summary: Excluir um item
 *     tags: [Itens]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do item
 *     responses:
 *       204:
 *         description: Item excluído com sucesso
 *       401:
 *         description: Token inválido ou não informado
 *       404:
 *         description: Item não encontrado
 */
router.delete("/:id", autenticar, (req, res) => controller.excluir(req, res));

module.exports = router;