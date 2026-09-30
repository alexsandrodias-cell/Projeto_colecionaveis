# Acervo de Colecionáveis

API RESTful desenvolvida para gerenciamento de um acervo de itens colecionáveis.

# Integrantes

Alexsandro Dias dos Santos
Evelyn Lorrany Costa Porto
Izadora Gomes Miranda
Sandro Alex Dias dos Santos Júnior

## Tecnologias

- Node.js
- Express
- Sequelize
- SQLite
- JWT
- bcrypt
- Swagger
- Jest
- Supertest

## Estrutura

O projeto utiliza uma arquitetura em camadas:

- Models
- Repositories
- Services
- Controllers
- Routes

## Entidades

### Usuário

- id_usuario
- nome
- email
- senha
- telefone
- data_cadastro

### Item

- id_item
- nome
- foto
- categoria
- descricao
- status
- data_cadastro
- id_usuario

## Relacionamento

Um usuário pode cadastrar vários itens.

USUÁRIO 1 ───────── 0..N ITEM