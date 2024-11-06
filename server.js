require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Client } = require('pg');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

// Stelle die Verbindung einmalig beim Start des Servers her
(async () => {
  try {
    await client.connect();
    console.log('Verbindung zur Datenbank hergestellt');
  } catch (err) {
    console.error('Fehler bei der Verbindung zur Datenbank:', err);
    process.exit(1); // Beende den Prozess, wenn die Verbindung nicht hergestellt werden kann
  }
})();

app.get('/api/lehrer', async (req, res) => {
  try {
    const result = await client.query(
      'SELECT "LehrerID" AS lehrerid, "Vorname" AS vorname, "Nachname" AS nachname, "Email" AS email FROM "Lehrer"',
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Fehler beim Abrufen der Daten:', err);
    res.status(500).send('Fehler beim Abrufen der Daten');
  }
});

app.post('/api/lehrer', async (req, res) => {
  const { vorname, nachname, geburtsdatum, geschlecht, email, passwort } = req.body;
  try {
    const result = await client.query(
      'INSERT INTO "Lehrer" ("Vorname", "Nachname", "Geburtsdatum", "Geschlecht", "Email", "Passwort") VALUES ($1, $2, $3, $4, $5, $6) RETURNING "LehrerID" AS lehrerid, "Vorname" AS vorname, "Nachname" AS nachname, "Email" AS email',
      [vorname, nachname, geburtsdatum, geschlecht, email, passwort],
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Fehler beim Hinzufügen der Daten:', err);
    res.status(500).send('Fehler beim Hinzufügen der Daten');
  }
});

app.delete('/api/lehrer/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await client.query('DELETE FROM "Lehrer" WHERE "LehrerID" = $1', [id]);
    res.status(204).send(); // Kein Inhalt, aber erfolgreich gelöscht
  } catch (err) {
    console.error('Fehler beim Löschen der Daten:', err);
    res.status(500).send('Fehler beim Löschen der Daten');
  }
});

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
