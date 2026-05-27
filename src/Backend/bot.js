import Groq from 'groq-sdk';
import { config } from 'dotenv';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, '.env') });

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function preguntarBot(pregunta, dades) {
  const context = `
    Ets un assistent virtual d'una tenda de cartes Pokémon anomenada PokeVault.
    Respon sempre en català o castellà de forma amable i concisa.

    PRODUCTES (id, nom, descripcio, tipus, preu, ofertaActiva, quantitat):
    ${JSON.stringify(dades.productes)}

    COMANDES (id, data, estat, idusuari):
    ${JSON.stringify(dades.comandes)}

    LÍNIES DE COMANDA (idlinia, idcomandes, idproducte, quantitat, preu_unitari, en_oferta):
    ${JSON.stringify(dades.linies)}

    CARRITOS (idcarrito, idusuari, data_creacio):
    ${JSON.stringify(dades.carritos)}

    LÍNIES DE CARRITO (idlinea, idcarrito, idproducte, quantitat, preu, data_limit):
    ${JSON.stringify(dades.linea_carritos)}

    Amb aquestes dades pots respondre sobre:
    - Productes disponibles i preus
    - Productes en oferta (ofertaActiva = true)
    - Estoc disponible (quantitat)
    - Estat de les comandes
    - Contingut dels carritos actuals
    - Productes més venuts
  `;

  const resposta = await groq.chat.completions.create({
    messages: [
      { role: 'system', content: context },
      { role: 'user', content: pregunta }
    ],
    model: 'llama-3.3-70b-versatile',
    temperature: 0.7,
    max_tokens: 500
  });

  return resposta.choices[0].message.content;

}
