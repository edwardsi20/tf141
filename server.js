require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const { Client } = require('pg');

const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const router = express.Router();
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

app.get('/api/schueler', async (req, res) => {
  try {
    const result = await client.query(
      'SELECT "SchuelerID" AS schuelerid, "Vorname" AS vorname, "Nachname" AS nachname, "Email" AS email FROM "Schueler"',
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Fehler beim Abrufen der Schülerdaten:', err);
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

// Authentifizierungs-Endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Lehrer prüfen
    const lehrerResult = await client.query(
      'SELECT "LehrerID" AS id, "Vorname", "Nachname", "Email", "Passwort" FROM "Lehrer" WHERE "Email" = $1',
      [email],
    );

    if (lehrerResult.rows.length > 0) {
      const lehrer = lehrerResult.rows[0];
      // Direktes Vergleichen von Klartextpasswörtern
      if (password === lehrer.Passwort) {
        return res.json({ role: 'Lehrer', user: lehrer });
      }
    }

    // Schüler prüfen
    const schuelerResult = await client.query(
      'SELECT "SchuelerID" AS id, "Vorname", "Nachname", "Email", "Passwort" FROM "Schueler" WHERE "Email" = $1',
      [email],
    );

    if (schuelerResult.rows.length > 0) {
      const schueler = schuelerResult.rows[0];
      // Direktes Vergleichen von Klartextpasswörtern
      if (password === schueler.Passwort) {
        return res.json({ role: 'Schueler', user: schueler });
      }
    }

    // Keine Übereinstimmung gefunden
    res.status(401).json({ message: 'Ungültige E-Mail oder Passwort' });
  } catch (err) {
    console.error('Fehler bei der Authentifizierung:', err);
    res.status(500).send('Fehler bei der Authentifizierung');
  }
});

// Register-Endpoint
app.post('/api/register', async (req, res) => {
  const { role, vorname, nachname, geburtsdatum, geschlecht, email, password } = req.body;

  try {
    if (role === 'Lehrer') {
      // Lehrer einfügen
      await client.query(
        'INSERT INTO "Lehrer" ("Vorname", "Nachname", "Geburtsdatum", "Geschlecht", "Email", "Passwort") VALUES ($1, $2, $3, $4, $5, $6)',
        [vorname, nachname, geburtsdatum, geschlecht, email, password],
      );
      return res.status(201).json({ message: 'Lehrer erfolgreich registriert!' });
    } else if (role === 'Schueler') {
      // Schüler einfügen
      await client.query(
        'INSERT INTO "Schueler" ("Vorname", "Nachname", "Geburtsdatum", "Geschlecht", "Email", "Passwort") VALUES ($1, $2, $3, $4, $5, $6)',
        [vorname, nachname, geburtsdatum, geschlecht, email, password],
      );
      return res.status(201).json({ message: 'Schüler erfolgreich registriert!' });
    } else {
      return res.status(400).json({ message: 'Ungültige Rolle angegeben' });
    }
  } catch (err) {
    console.error('Fehler bei der Registrierung:', err);
    res.status(500).send('Fehler bei der Registrierung');
  }
});

app.get('/api/profile/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await client.query(
      'SELECT "Vorname", "Nachname", "Email", "Geburtsdatum", "Geschlecht" FROM "Schueler" WHERE "SchuelerID" = $1 UNION ALL SELECT "Vorname", "Nachname", "Email", "Geburtsdatum", "Geschlecht" FROM "Lehrer" WHERE "LehrerID" = $1',
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Profil nicht gefunden' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Fehler beim Abrufen des Profils:', err);
    res.status(500).send('Fehler beim Abrufen des Profils');
  }
});

app.put('/api/profile/:id', async (req, res) => {
  const { id } = req.params;
  const { vorname, nachname, email, geburtsdatum, geschlecht } = req.body;

  try {
    // Versuche zuerst, das Profil als Schüler zu aktualisieren
    const schuelerResult = await client.query(
      `
      UPDATE "Schueler"
      SET "Vorname" = $1, "Nachname" = $2, "Email" = $3, "Geburtsdatum" = $4, "Geschlecht" = $5
      WHERE "SchuelerID" = $6
      RETURNING *;
      `,
      [vorname, nachname, email, geburtsdatum, geschlecht, id],
    );

    // Falls kein Schüler gefunden wurde, versuche das Lehrer-Profil zu aktualisieren
    if (schuelerResult.rowCount === 0) {
      const lehrerResult = await client.query(
        `
        UPDATE "Lehrer"
        SET "Vorname" = $1, "Nachname" = $2, "Email" = $3, "Geburtsdatum" = $4, "Geschlecht" = $5
        WHERE "LehrerID" = $6
        RETURNING *;
        `,
        [vorname, nachname, email, geburtsdatum, geschlecht, id],
      );

      if (lehrerResult.rowCount === 0) {
        return res.status(404).json({ message: 'Profil nicht gefunden' });
      }

      // Erfolgreiches Lehrer-Update
      return res.json({
        message: 'Profil erfolgreich aktualisiert',
        profile: lehrerResult.rows[0],
      });
    }

    // Erfolgreiches Schüler-Update
    return res.json({
      message: 'Profil erfolgreich aktualisiert',
      profile: schuelerResult.rows[0],
    });
  } catch (err) {
    console.error('Fehler beim Aktualisieren des Profils:', err);
    res.status(500).send('Fehler beim Aktualisieren des Profils');
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

// New endpoint to search for teachers by partial match on Vorname or Nachname
app.get('/api/lehrer/search', async (req, res) => {
  const { q } = req.query; // Get the search query from the URL

  // Use parameterized query to prevent SQL injection
  try {
    const result = await client.query(
      'SELECT "LehrerID" AS lehrerid, "Vorname" AS vorname, "Nachname" AS nachname, "Email" AS email ' +
        'FROM "Lehrer" WHERE LOWER("Vorname") ILIKE $1 OR LOWER("Nachname") ILIKE $1',
      [`%${q}%`], // ILIKE with wildcards for case-insensitive partial match
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error performing search:', err);
    res.status(500).send('Error performing search');
  }
});

app.post('/send-email', async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Konfiguration des E-Mail-Transports
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // Oder ein anderer SMTP-Dienst
    auth: {
      user: 'edwards.i20@htlwienwest.at', // Deine E-Mail
      pass: 'HotelTangoLima15', // Passwort (oder App-Passwort, falls 2FA aktiv ist)
    },
  });

  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: 'edwards.i20@htlwienwest', // Ziel-E-Mail-Adresse
    subject: subject || 'Neue Kontaktanfrage',
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('E-Mail erfolgreich gesendet');
  } catch (error) {
    console.error(error);
    res.status(500).send('Fehler beim Senden der E-Mail');
  }
});

// Admin Registrierung
app.post('/api/admin-register', async (req, res) => {
  const { vorname, nachname, email, passwort } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(passwort, 10);
    const result = await client.query(
      'INSERT INTO Admin (Vorname, Nachname, Email, Passwort) VALUES ($1, $2, $3, $4) RETURNING AdminID, Vorname, Nachname, Email',
      [vorname, nachname, email, hashedPassword],
    );
    res.status(201).json({ message: 'Admin erfolgreich registriert', admin: result.rows[0] });
  } catch (err) {
    console.error('Fehler bei der Admin-Registrierung:', err);
    res.status(500).send('Fehler bei der Registrierung');
  }
});

// Admin Login
app.post('/api/admin-login', async (req, res) => {
  const { email, passwort } = req.body;

  try {
    const result = await client.query('SELECT * FROM Admin WHERE Email = $1', [email]);
    if (result.rows.length === 0)
      return res.status(401).json({ message: 'Ungültige Anmeldeinformationen' });

    const admin = result.rows[0];
    const isMatch = await bcrypt.compare(passwort, admin.passwort);
    if (!isMatch) return res.status(401).json({ message: 'Ungültige Anmeldeinformationen' });

    res.json({
      message: 'Login erfolgreich',
      admin: {
        id: admin.adminid,
        vorname: admin.vorname,
        nachname: admin.nachname,
        email: admin.email,
      },
    });
  } catch (err) {
    console.error('Fehler beim Admin-Login:', err);
    res.status(500).send('Fehler bei der Anmeldung');
  }
});

// Benutzer löschen
// router.delete('/api/user/:id', async (req, res) => {
//   try {
//     await client.query('DELETE FROM Lehrer WHERE LehrerID = $1', [req.params.id]);
//     await client.query('DELETE FROM Schueler WHERE SchuelerID = $1', [req.params.id]);
//     res.status(204).send();
//   } catch (err) {
//     console.error('Fehler beim Löschen:', err);
//     res.status(500).send('Fehler beim Löschen');
//   }
// });

// Benutzer deaktivieren
router.put('/api/user/:id/deaktivieren', async (req, res) => {
  try {
    await client.query(
      'UPDATE Lehrer SET Email = CONCAT(Email, ".deaktiviert") WHERE LehrerID = $1',
      [req.params.id],
    );
    await client.query(
      'UPDATE Schueler SET Email = CONCAT(Email, ".deaktiviert") WHERE SchuelerID = $1',
      [req.params.id],
    );
    res.json({ message: 'Benutzer deaktiviert' });
  } catch (err) {
    console.error('Fehler beim Deaktivieren:', err);
    res.status(500).send('Fehler beim Deaktivieren');
  }
});

console.log(app._router.stack.map((r) => r.route && r.route.path).filter(Boolean));

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});

module.exports = router;
