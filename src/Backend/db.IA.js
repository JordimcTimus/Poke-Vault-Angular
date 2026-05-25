import dotenv from 'dotenv';
dotenv.config();

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const { crearConfigBaseDades } = require('./db.config.js');
const initModels = require('./models/init-models.js');

const dbSQL = crearConfigBaseDades();
const models = initModels(dbSQL);

export async function connectDB() {
  await dbSQL.authenticate();
  console.log('Connectat a MySQL');
}

export async function getDadesTenda() {
  const productes= await models.producte.findAll({ raw: true });
  const comandes= await models.comandes.findAll({ raw: true });
  const linies = await models.linies_comanda.findAll({ raw: true });
  const carritos = await models.carritos.findAll({ raw: true });
  const linea_carritos= await models.linea_carritos.findAll({ raw: true });

  return { productes, comandes, linies, carritos, linea_carritos };
}
