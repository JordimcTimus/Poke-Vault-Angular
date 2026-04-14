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

const db = admin.firestore(); // Firestore (base de datos de documento)
const rtdb = admin.database(); // Realtime Database (base de datos en tiempo real)
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// OLVIDAR CONTRASEÑA
app.post('/forgot-password', async (req, res) => {

  //Recibe el email del cliente
  const {email} = req.body;

  //Busca dentro de la base de datos si existe el email
  const snapshot = await rtdb.ref('usuaris').orderByChild('email').equalTo(email).get();
  if (!snapshot.exists()) return res.json({message: 'Si existeix el compte, rebràs un correu.'});

  //Si existe crea un numero/token aleatorio que expira en 1 hora
  const token = Math.random().toString(36).substring(2) + Date.now().toString(36);
  const expiry = Date.now() + 60 * 60 * 1000;

  //Guarda el token como una variable en la base de datos
  const userId = Object.keys(snapshot.val())[0];
  await rtdb.ref(`usuaris/${userId}`).update({resetToken: token, resetTokenExpiry: expiry});

  //Crea un link especialmente para ese mismo token
  const link = `http://localhost:4200/recuperar-contrasenya/${token}`;

  //Envia un email para resetear la contraseña
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

  res.json({message: 'Si existeix el compte, rebràs un correu.'});
});

// RESETEAR CONTRASEÑA
app.post('/reset-password/:token', async (req, res) => {

  //Recibe el token y la contraseña
  const {password} = req.body;
  const {token} = req.params;

  //Busca el token en la base de datos y también mira que no haya caducado
  const snapshot = await rtdb.ref('usuaris').orderByChild('resetToken').equalTo(token).get();
  if (!snapshot.exists()) return res.status(400).json({message: 'Token invàlid o caducat'});

  const userId = Object.keys(snapshot.val())[0];
  const user = snapshot.val()[userId];

  if (user.resetTokenExpiry < Date.now()) return res.status(400).json({message: 'Token caducat'});

  //Coge la contraseña y la encripta con bycript
  const hashed = await bcrypt.hash(password, 10);

  //Guarda la nueva contraseña encriptada y elimina el token
  await rtdb.ref(`usuaris/${userId}`).update({
    password: hashed,
    resetToken: null,
    resetTokenExpiry: null
  });

  res.json({message: 'Contrasenya actualitzada correctament'});

});

/* TEST EMAIL
app.get('/test-email', async (req, res) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: 'pokevault.noreply@gmail.com',
    subject: 'Test Pokevault',
    text: 'Si ves esto, nodemailer funciona'
  });
  res.json({ message: 'Email enviat!' });
});
 */



app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
