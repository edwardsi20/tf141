async function handleSubmit(action) {
    const vorname = document.getElementById('vorname').value;
    const nachname = document.getElementById('nachname').value;
  
    if (!vorname || !nachname) {
      alert('Bitte geben Sie sowohl Vorname als auch Nachname ein.');
      return;
    }
  
    const response = await fetch('/api/lehrer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ vorname, nachname, action })
    });
  
    const result = await response.text();
    alert(result);
  }
  
  async function fetchLehrer() {
    try {
      const response = await fetch('/api/lehrer');
      const lehrerList = await response.json();
  
      const lehrerUl = document.getElementById('lehrer-list');
      lehrerUl.innerHTML = ''; // Liste leeren
  
      lehrerList.forEach(lehrer => {
        const li = document.createElement('li');
        li.textContent = `${lehrer.vorname} ${lehrer.nachname}`;
        lehrerUl.appendChild(li);
      });
    } catch (error) {
      console.error('Fehler beim Abrufen der Lehrer-Daten', error);
    }
  }
  
  // Diese Funktion wird ausgeführt, sobald die Seite geladen wird
  document.addEventListener('DOMContentLoaded', fetchLehrer);