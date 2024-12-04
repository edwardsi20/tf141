<template>
  <div class="info-page">
    <header class="header">
      <h1>Informationen</h1>
    </header>
    <section class="info-content">
      <article class="info-card">
        <h2>Über uns</h2>
        <p>Wir bieten eine Plattform, um Schüler und Nachhilfelehrer zusammenzubringen.</p>
      </article>
      <article class="info-card">
        <h2>Unsere Mission</h2>
        <p>Effektive Lernunterstützung für alle, die ihre Ziele erreichen möchten.</p>
      </article>
      <article class="info-card">
        <h2>Kontakt</h2>
        <p>Sie erreichen uns per E-Mail unter kontakt@nachhilfeboerse.at.</p>
      </article>
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
  name: 'InfoPage',
};
</script>

<style scoped>
/* General Styling */
.info-page {
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

/* Info Section */
.info-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  padding: 2rem;
}

.info-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  text-align: center;
  width: 300px;
}

.info-card h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.info-card p {
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
