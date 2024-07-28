// require('dotenv').config(); // Lädt die Umgebungsvariablen aus der .env-Datei
// const { Pool } = require('pg'); // Importiert das PostgreSQL-Client-Modul

// // Erstelle eine Pool-Instanz mit der Verbindungs-URL aus den Umgebungsvariablen
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL
// });

// // Beispiel für eine einfache Abfrage
// async function testConnection() {
//   try {
//     const res = await pool.query('SELECT NOW()'); // Führt eine SQL-Abfrage aus
//     console.log(res.rows); // Gibt das Ergebnis der Abfrage aus
//   } catch (err) {
//     console.error('Error executing query', err.stack); // Gibt bei Fehlern eine Fehlermeldung aus
//   }
// }

// testConnection(); // Führt die Testverbindung aus

// require('dotenv').config(); // Lädt die Umgebungsvariablen aus der .env-Datei
// const express = require('express'); // Importiert Express für das Web-Framework
// const { Pool } = require('pg'); // Importiert das PostgreSQL-Client-Modul

// const app = express();
// const port = 3000;

// // Erstelle eine Pool-Instanz mit der Verbindungs-URL aus den Umgebungsvariablen
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL
// });

// // Middleware für das Parsen von JSON-Anfragen
// app.use(express.json());
// app.use(express.static('public')); // Statische Dateien aus dem 'public'-Verzeichnis bedienen

// // Route für die Bearbeitung von Lehrer-Daten
// app.post('/api/lehrer', async (req, res) => {
//   const { vorname, nachname, action } = req.body;

//   if (!vorname || !nachname || !action) {
//     return res.status(400).send('Fehlende Parameter');
//   }

//   try {
//     if (action === 'add') {
//       await pool.query('INSERT INTO lehrer (vorname, nachname) VALUES ($1, $2)', [vorname, nachname]);
//       res.send('Lehrer hinzugefügt');
//     } else if (action === 'delete') {
//       await pool.query('DELETE FROM lehrer WHERE vorname = $1 AND nachname = $2', [vorname, nachname]);
//       res.send('Lehrer gelöscht');
//     } else {
//       res.status(400).send('Ungültige Aktion');
//     }
//   } catch (err) {
//     console.error('Error executing query', err.stack);
//     res.status(500).send('Fehler beim Bearbeiten der Daten');
//   }
// });

// // Route für die Root-URL
// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/public/test.html'); // Stelle sicher, dass die Datei 'test.html' geladen wird
// });

// // Starte den Express-Server
// app.listen(port, () => {
//   console.log(`Server läuft auf http://localhost:${port}`);
// });


require('dotenv').config(); // Lädt die Umgebungsvariablen aus der .env-Datei
const express = require('express'); // Importiert Express für das Web-Framework
const { Pool } = require('pg'); // Importiert das PostgreSQL-Client-Modul
const path = require('path');

const app = express();
const port = 3000;

// Erstelle eine Pool-Instanz mit der Verbindungs-URL aus den Umgebungsvariablen
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// Middleware für das Parsen von JSON-Anfragen
app.use(express.json());
app.use(express.static('public')); // Statische Dateien aus dem 'public'-Verzeichnis bedienen

// Route für die Bearbeitung von Lehrer-Daten
app.post('/api/lehrer', async (req, res) => {
  const { vorname, nachname, action } = req.body;

  if (!vorname || !nachname || !action) {
    return res.status(400).send('Fehlende Parameter');
  }

  try {
    if (action === 'add') {
      await pool.query('INSERT INTO lehrer (vorname, nachname) VALUES ($1, $2)', [vorname, nachname]);
      res.send('Lehrer hinzugefügt');
    } else if (action === 'delete') {
      await pool.query('DELETE FROM lehrer WHERE vorname = $1 AND nachname = $2', [vorname, nachname]);
      res.send('Lehrer gelöscht');
    } else {
      res.status(400).send('Ungültige Aktion');
    }
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).send('Fehler beim Bearbeiten der Daten');
  }
});

// Route für die Root-URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'test.html'));
});

// Route für das Abrufen der Lehrer-Daten
app.get('/api/lehrer', async (req, res) => {
  try {
    const result = await pool.query('SELECT vorname, nachname FROM lehrer');
    res.json(result.rows);
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).send('Fehler beim Abrufen der Lehrer-Daten');
  }
});


// Starte den Express-Server
app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
