import express from 'express';
import cors from 'cors';
import admin from 'firebase-admin';
import { createRequire } from 'module';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { getDatabase } from 'firebase-admin/database';

//cd .\src\Backend\
//npx nodemon server.js
dotenv.config();

const require = createRequire(import.meta.url);

const serviceAccount = require('./pokevault-c1eb0-firebase-adminsdk-fbsvc-5050f49178.json');
const { DataTypes } = require('sequelize');
const { crearConfigBaseDades } = require('./db.config.js');
const Producte      = require('./models/producte.js');
const LiniesComanda = require('./models/linies_comanda.js');
const Comanda       = require('./models/comandes.js');

// Creamos una conexion entre GMAIL y el servidor para poder mandar emails desde el server
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://pokevault-c1eb0-default-rtdb.europe-west1.firebasedatabase.app"
});

const db   = admin.firestore();
const rtdb = admin.database();
const app  = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const dbSQL        = crearConfigBaseDades();

// ================================================================ //
// ======================FORGOT PASSWORD=========================== //
// ================================================================ //

app.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  const snapshot = await rtdb.ref('usuaris').orderByChild('email').equalTo(email).get();
  if (!snapshot.exists()) return res.json({ message: 'Si existeix el compte, rebràs un correu.' });

  const token  = Math.random().toString(36).substring(2) + Date.now().toString(36);
  const expiry = Date.now() + 60 * 60 * 1000;

  const userId = Object.keys(snapshot.val())[0];
  await rtdb.ref(`usuaris/${userId}`).update({ resetToken: token, resetTokenExpiry: expiry });

  const link = `http://localhost:4200/recuperar-contrasenya/${token}`;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Restableix la teva contrasenya - Pokevault',
    html: `
      <h2>Restabliment de contrasenya</h2>
      <p>Fes clic aquí per canviar la teva contrasenya:</p>
      <a href="${link}" style="background:#e63946;color:#fff;padding:10px 20px;border-radius:5px;text-decoration:none;">
        Restablir contrasenya
      </a>
      <p>L'enllaç caduca en 1 hora.</p>
    `
  });

  res.json({ message: 'Si existeix el compte, rebràs un correu.' });
});

// ================================================================ //
// =====================RESET PASSWORD============================= //
// ================================================================ //

app.post('/reset-password/:token', async (req, res) => {
  const { password } = req.body;
  const { token }    = req.params;

  const snapshot = await rtdb.ref('usuaris').orderByChild('resetToken').equalTo(token).get();
  if (!snapshot.exists()) return res.status(400).json({ message: 'Token invàlid o caducat' });

  const userId = Object.keys(snapshot.val())[0];
  const user   = snapshot.val()[userId];

  if (user.resetTokenExpiry < Date.now()) return res.status(400).json({ message: 'Token caducat' });

  const hashed = await bcrypt.hash(password, 10);

  await rtdb.ref(`usuaris/${userId}`).update({
    password:           hashed,
    resetToken:         null,
    resetTokenExpiry:   null
  });

  res.json({ message: 'Contrasenya actualitzada correctament' });
});

// ================================================================ //
// ========================= ORM   ================================ //
// ================================================================ //

const { initModels } = require("./models/init-models");
const { comandes, linies_comanda, producte } = initModels(dbSQL);

// ================================================================ //
// =========================GETTERS================================ //
// ================================================================ //
app.get('/GetProductes', async (req, res) => {
  const productes = await producte.findAll();
  res.json(productes);
});

app.get('/GetComanda', async (req, res) => {
  const comandes = await comandes.findAll();
  res.json(comandes);
});

app.get('/GetLiniesComanda', async (req, res) => {
  const linies = await liniesComanda.findAll();
  res.json(linies);
});

// ================================================================ //
// =========================SETTERS================================ //
// ================================================================ //

app.put('/SetLinesComanda/:codiFactura', async (req, res) => {
  const productosVendidos = await liniesComanda.findAll({
    where: { idlinia: req.params.codiFactura }
  });
  res.json(productosVendidos);
});

app.put('/añadirProducto', async (req, res) => {

})


// ================================================================ //
// =========================GRAFICOS=============================== //
// ================================================================ //

// Devuelve la cantidad vendida de un producto por mes
// Exemple: GET /GetVendesPerMes/1
app.get('/GetVendesPerMes/:idproducte', async (req, res) => {
  const { idproducte } = req.params;

  const resultats = await dbSQL.query(`
    SELECT DATE_FORMAT(c.data, '%Y-%m') AS mes, SUM(l.quantitat) AS total_venut
    FROM linies_comanda l
    JOIN comandes c ON l.idcomandes = c.idcomandes
    WHERE l.idproducte = :idproducte
    GROUP BY mes
    ORDER BY mes ASC
  `, {
    replacements: { idproducte },
    type: dbSQL.QueryTypes.SELECT
  });

  res.json(resultats);
});

// Devuelve todos los productos vendidos por mes
// GET /GetVendesPerMes
app.get('/GetVendesPerMes', async (req, res) => {
  const resultats = await dbSQL.query(`
    SELECT
      p.idproducte,
      p.nom,
      p.tipus,
      DATE_FORMAT(c.data, '%Y-%m') AS mes,
      SUM(l.quantitat)             AS total_venut
    FROM linies_comanda l
    JOIN comandes c  ON l.idcomandes = c.idcomandes
    JOIN producte p  ON l.idproducte = p.idproducte
    GROUP BY p.idproducte, mes
    ORDER BY mes ASC, p.nom ASC
  `, {
    type: dbSQL.QueryTypes.SELECT
  });

  res.json(resultats);
});

// Devuelve el total vendido con oferta y sin
// GET /GetVendesOfertaVsSenseOferta
app.get('/GetVendesOfertaVsSenseOferta', async (req, res) => {
  const resultats = await dbSQL.query(`
    SELECT
      DATE_FORMAT(c.data, '%Y-%m')                                    AS mes,
      SUM(CASE WHEN p.ofertaActiva = 1 THEN l.quantitat ELSE 0 END)  AS vendes_oferta,
      SUM(CASE WHEN p.ofertaActiva = 0 THEN l.quantitat ELSE 0 END)  AS vendes_sense_oferta
    FROM linies_comanda l
    JOIN comandes c ON l.idcomandes = c.idcomandes
    JOIN producte p ON l.idproducte = p.idproducte
    GROUP BY mes
    ORDER BY mes ASC
  `, { type: dbSQL.QueryTypes.SELECT });

  res.json(resultats);
});

app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
