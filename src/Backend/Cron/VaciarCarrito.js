import cron from "node-cron";
import {Op} from "sequelize"
import initModels from "../models/init-models.js";
import {crearConfigBaseDades} from "../db.config.js"

const sequelize = crearConfigBaseDades()
const db = initModels(sequelize);
// MINUTOS 0-59|HORAS 0-23|DIA DEL MES 1-31|MES 1-12|DIA DE LA SEMANA 0-7
cron.schedule("0 * * * *", async () => {
  try{
    console.log("cron revisando lineas de carrito caducados...")
    const eliminadas = await db.linea_carritos.destroy({
      where: {
        data_limit: {[Op.lt]: new Date()}
      }
    })
    console.log("Lineas eliminadas: " + eliminadas)
  }catch (error) {
    console.log("Error Cron: " + error)
  }
})

