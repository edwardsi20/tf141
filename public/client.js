async function handleSubmit(action) {
  const vorname = document.getElementById('vorname').value;
  const nachname = document.getElementById('nachname').value;
  const geburtsdatum = document.getElementById('geburtsdatum').value;
  const geschlecht = document.getElementById('geschlecht').value;
  const email = document.getElementById('email').value;
  const passwort = document.getElementById('passwort').value;

  if (!vorname || !nachname || !geburtsdatum || !geschlecht || !email || !passwort) {
    alert('Bitte füllen Sie alle Felder aus.');
    return;
  }

  const response = await fetch('/api/lehrer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ vorname, nachname, geburtsdatum, geschlecht, email, passwort, action }),
  });

  const result = await response.text();
  alert(result);
  fetchLehrer(); // Aktualisiert die Liste nach dem Hinzufügen
}

async function fetchLehrer() {
  try {
    const response = await fetch('/api/lehrer');
    const lehrerList = await response.json();

    const lehrerUl = document.getElementById('lehrer-list');
    lehrerUl.innerHTML = ''; // Liste leeren

    lehrerList.forEach((lehrer) => {
      const li = document.createElement('li');
      li.textContent = `${lehrer.vorname} ${lehrer.nachname} - ${lehrer.email}`;

      // Lösch-Button für jeden Lehrer
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Löschen';
      deleteButton.className = 'btn btn-danger btn-sm ml-2';
      deleteButton.onclick = () => deleteLehrer(lehrer.lehrerid);

      li.appendChild(deleteButton);
      lehrerUl.appendChild(li);
    });
  } catch (error) {
    console.error('Fehler beim Abrufen der Lehrer-Daten', error);
  }
}

async function deleteLehrer(id) {
  try {
    const response = await fetch(`/api/lehrer/${id}`, {
      method: 'DELETE',
    });
    if (response.status === 204) {
      alert('Lehrer erfolgreich gelöscht');
      fetchLehrer(); // Aktualisiert die Liste nach dem Löschen
    } else {
      alert('Fehler beim Löschen des Lehrers');
    }
  } catch (error) {
    console.error('Fehler beim Löschen der Lehrer-Daten', error);
  }
}

// Diese Funktion wird ausgeführt, sobald die Seite geladen wird
document.addEventListener('DOMContentLoaded', fetchLehrer);
