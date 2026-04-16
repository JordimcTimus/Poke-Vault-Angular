//Exportem la llibreria sequelizer
const Sequelize = require('sequelize');

//Retorna connexió a la base de dades:
const crearConfigBaseDades = () => {
  return new Sequelize("pokevault", "root", "kevin", {
    host: "localhost",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });
}

//Exportem la funció
module.exports = {crearConfigBaseDades}

