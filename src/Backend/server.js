import express from 'express';
import cors from 'cors';
import admin from 'firebase-admin';
import { createRequire } from 'module';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// cd .\src\Backend\
//npx nodemon server.js

dotenv.config();

const require = createRequire(import.meta.url);
const serviceAccount = require('./pokevault-c1eb0-firebase-adminsdk-fbsvc-28646ff553.json');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/test-email', async (req, res) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: 'pokevault.noreply@gmail.com',
    subject: 'Test Pokevault',
    text: 'Si ves esto, nodemailer funciona!'
  });
  res.json({ message: 'Email enviat!' });
});

app.get('/firebase-document', async (req, res) => {
  db.collection('Business').doc('Buisness 2').get().then(al2 => {
    res.json(al2);
  });
});

app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
