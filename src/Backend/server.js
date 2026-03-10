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

const db = admin.firestore();
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const rtdb = admin.database();

// OLVIDAR CONTRASEÑA
app.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    const snapshot = await rtdb.ref('usuaris').orderByChild('email').equalTo(email).get();
    if (!snapshot.exists()) return res.json({ message: 'Si existeix el compte, rebràs un correu.' });

    const token = Math.random().toString(36).substring(2) + Date.now().toString(36);
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

  } catch (error) {
    console.error('ERROR:', error);
    res.status(500).json({ message: 'Error intern' });
  }
});

// RESETEAR CONTRASEÑA
app.post('/reset-password/:token', async (req, res) => {
  try {
    const { password } = req.body;
    const { token } = req.params;

    const snapshot = await rtdb.ref('usuaris').orderByChild('resetToken').equalTo(token).get();
    if (!snapshot.exists()) return res.status(400).json({ message: 'Token invàlid o caducat' });

    const userId = Object.keys(snapshot.val())[0];
    const user = snapshot.val()[userId];

    if (user.resetTokenExpiry < Date.now()) return res.status(400).json({ message: 'Token caducat' });

    const hashed = await bcrypt.hash(password, 10);
    await rtdb.ref(`usuaris/${userId}`).update({
      password: hashed,
      resetToken: null,
      resetTokenExpiry: null
    });

    res.json({ message: 'Contrasenya actualitzada correctament' });

  } catch (error) {
    console.error('ERROR:', error);
    res.status(500).json({ message: 'Error intern' });
  }
});

app.get('/test-email', async (req, res) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: 'pokevault.noreply@gmail.com',
    subject: 'Test Pokevault',
    text: 'Si ves esto, nodemailer funciona'
  });
  res.json({ message: 'Email enviat!' });
});

app.get('/firebase-document', async (req, res) => {
  db.collection('Business').doc('Buisness 2').get().then(al2 => {
    res.json(al2);
  });
});

app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
