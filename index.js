require('dotenv').config(); // Lädt die Umgebungsvariablen aus der .env-Datei
const { Pool } = require('pg'); // Importiert das PostgreSQL-Client-Modul

// Erstelle eine Pool-Instanz mit der Verbindungs-URL aus den Umgebungsvariablen
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// Beispiel für eine einfache Abfrage
async function testConnection() {
  try {
    const res = await pool.query('SELECT NOW()'); // Führt eine SQL-Abfrage aus
    console.log(res.rows); // Gibt das Ergebnis der Abfrage aus
  } catch (err) {
    console.error('Error executing query', err.stack); // Gibt bei Fehlern eine Fehlermeldung aus
  }
}

testConnection(); // Führt die Testverbindung aus
