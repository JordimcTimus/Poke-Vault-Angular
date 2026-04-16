var DataTypes = require("sequelize").DataTypes;
var _comandes = require("./comandes");
var _linies_comanda = require("./linies_comanda");
var _producte = require("./producte");

function initModels(sequelize) {
  var comandes = _comandes(sequelize, DataTypes);
  var linies_comanda = _linies_comanda(sequelize, DataTypes);
  var producte = _producte(sequelize, DataTypes);

  linies_comanda.belongsTo(comandes, { as: "idcomandes_comande", foreignKey: "idcomandes"});
  comandes.hasMany(linies_comanda, { as: "linies_comandas", foreignKey: "idcomandes"});
  linies_comanda.belongsTo(producte, { as: "idproducte_producte", foreignKey: "idproducte"});
  producte.hasMany(linies_comanda, { as: "linies_comandas", foreignKey: "idproducte"});

  return {
    comandes,
    linies_comanda,
    producte,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
