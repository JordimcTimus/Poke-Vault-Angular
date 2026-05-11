var DataTypes = require("sequelize").DataTypes;
var _comandes       = require("./comandes");
var _linies_comanda = require("./linies_comanda");
var _producte       = require("./producte");
var _carrito        = require("./carrito");

function initModels(sequelize) {
  var comandes       = _comandes(sequelize, DataTypes);
  var linies_comanda = _linies_comanda(sequelize, DataTypes);
  var producte       = _producte(sequelize, DataTypes);
  var carrito        = _carrito(sequelize, DataTypes);

  linies_comanda.belongsTo(comandes,  { as: "comanda",  foreignKey: "idcomandes" });
  comandes.hasMany(linies_comanda,    { as: "linies",   foreignKey: "idcomandes" });
  linies_comanda.belongsTo(producte,  { as: "producte", foreignKey: "idproducte" });
  producte.hasMany(linies_comanda,    { as: "linies",   foreignKey: "idproducte" });

  return { comandes, linies_comanda, producte, carrito };
}

module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
