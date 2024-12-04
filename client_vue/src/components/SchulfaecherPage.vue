<template>
  <div class="schulfaecher-page">
    <header class="header">
      <h1>Schulfächer</h1>
    </header>
    <section class="subjects-list">
      <div class="subject-card">
        <h2>Mathematik</h2>
        <p>Alles von Algebra bis Geometrie.</p>
      </div>
      <div class="subject-card">
        <h2>Englisch</h2>
        <p>Verbessern Sie Ihre Sprachfähigkeiten.</p>
      </div>
      <div class="subject-card">
        <h2>Physik</h2>
        <p>Verstehen Sie die Gesetze der Natur.</p>
      </div>
      <div class="subject-card">
        <h2>Biologie</h2>
        <p>Lernen Sie mehr über das Leben.</p>
      </div>
    </section>
  </div>

  <footer class="footer">
    <p>© 2023 Nachhilfebörse</p>
    <ul class="footer-links">
      <li><router-link to="/impressum">Impressum</router-link></li>
      <li><router-link to="/privacy">Datenschutz</router-link></li>
      <li><router-link to="/contact">Kontakt</router-link></li>
    </ul>
  </footer>
</template>

<script>
export default {
  name: 'SchulfaecherPage',
};
</script>

<style scoped>
/* General Styling */
.schulfaecher-page {
  font-family: Arial, sans-serif;
  color: #333;
  margin: 0;
  padding: 0;
  text-align: center;
}

/* Header */
.header h1 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  padding: 2rem 1rem;
  background-color: #1dace0;
  color: #fff;
}

/* Subjects Section */
.subjects-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  padding: 2rem;
}

.subject-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  text-align: center;
  width: 300px;
}

.subject-card h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.subject-card p {
  font-size: 1rem;
  color: #666;
}

.footer {
  text-align: center;
  padding: 2rem;
  background-color: #333;
  color: #fff;
}
.footer-links {
  list-style: none;
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 1rem 0 0;
  padding: 0;
}
.footer-links li a {
  color: #1dace0;
  text-decoration: none;
}
</style>
