var DataTypes = require("sequelize").DataTypes;
var _comandes       = require("./comandes");
var _linies_comanda = require("./linies_comanda");
var _producte       = require("./producte");

function initModels(sequelize) {
  var comandes       = _comandes(sequelize, DataTypes);
  var linies_comanda = _linies_comanda(sequelize, DataTypes);
  var producte       = _producte(sequelize, DataTypes);

  // Una comanda tiene muchas linies, una linia pertenece a una comanda
  linies_comanda.belongsTo(comandes, { as: "comanda",  foreignKey: "idcomandes" });
  comandes.hasMany(linies_comanda,   { as: "linies",   foreignKey: "idcomandes" });

  // Un producte tiene muchas linies, una linia pertenece a un producte
  linies_comanda.belongsTo(producte, { as: "producte", foreignKey: "idproducte" });
  producte.hasMany(linies_comanda,   { as: "linies",   foreignKey: "idproducte" });

  return { comandes, linies_comanda, producte };
}

module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
