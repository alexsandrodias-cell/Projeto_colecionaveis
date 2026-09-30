const Usuario = require("./Usuario");
const Item = require("./Item");

Usuario.hasMany(Item, {
    foreignKey: "id_usuario",
    as: "itens"
});

Item.belongsTo(Usuario, {
    foreignKey: "id_usuario",
    as: "usuario"
});

module.exports = {
    Usuario,
    Item
};