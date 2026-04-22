//Exportem la llibreria sequelizer
import Sequelize from "sequelize";
//Retorna connexió a la base de dades:
export const crearConfigBaseDades = () => {
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
