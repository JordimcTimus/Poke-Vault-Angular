import express from 'express';
import cors from 'cors';
import admin from 'firebase-admin';
import { createRequire } from 'module';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

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


app.get('/ejemplo', (req, res) => {
  res.json({ nom: 'Kevin', cognom: 'Timus' });
});

app.get('/firebase-document', async (req, res) => {
  db.collection('Business').doc('Buisness 2').get().then(al2 => {
    res.json(al2);
  });
});

app.get('/starwars/jedis', async (req, res) => {
  const snapshot = await db.collection('starwars_firebase').where('esJedi', '==', true).get();
  const jedis = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  res.json(jedis);
});

app.post('/starwars', async (req, res) => {
  const { nom, esJedi } = req.body;
  const docRef = await db.collection('starwars_firebase').add({
    nom: nom,
    esJedi: esJedi
  });
  res.json({ message: 'Personatge creat', id: docRef.id });
});

app.put('/starwars/:id', async (req, res) => {
  const { id } = req.params;
  const dades = req.body;
  await db.collection('starwars_firebase').doc(id).set(dades, { merge: true });
  res.json({ message: 'Personatge actualitzat', id: id });
});

app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
