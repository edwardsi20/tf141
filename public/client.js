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
  