var DataTypes = require("sequelize").DataTypes;
var _carritos = require("./carritos");
var _comandes = require("./comandes");
var _linea_carritos = require("./linea_carritos");
var _linies_comanda = require("./linies_comanda");
var _producte = require("./producte");

function initModels(sequelize) {
  var carritos = _carritos(sequelize, DataTypes);
  var comandes = _comandes(sequelize, DataTypes);
  var linea_carritos = _linea_carritos(sequelize, DataTypes);
  var linies_comanda = _linies_comanda(sequelize, DataTypes);
  var producte = _producte(sequelize, DataTypes);

  linea_carritos.belongsTo(carritos, { as: "idcarrito_carrito", foreignKey: "idcarrito"});
  carritos.hasMany(linea_carritos, { as: "linea_carritos", foreignKey: "idcarrito"});
  linies_comanda.belongsTo(comandes, { as: "idcomandes_comande", foreignKey: "idcomandes"});
  comandes.hasMany(linies_comanda, { as: "linies_comandas", foreignKey: "idcomandes"});
  linea_carritos.belongsTo(producte, { as: "idproducte_producte", foreignKey: "idproducte"});
  producte.hasMany(linea_carritos, { as: "linea_carritos", foreignKey: "idproducte"});
  linies_comanda.belongsTo(producte, { as: "idproducte_producte", foreignKey: "idproducte"});
  producte.hasMany(linies_comanda, { as: "linies_comandas", foreignKey: "idproducte"});

  return {
    carritos,
    comandes,
    linea_carritos,
    linies_comanda,
    producte,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
