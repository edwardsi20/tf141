<template>
  <div class="how-it-works-page">
    <header class="header">
      <h1>So geht's</h1>
    </header>
    <section class="steps">
      <div class="step-card">
        <div class="step-number">1</div>
        <h2>Registrieren</h2>
        <p>Erstelle ein kostenloses Konto.</p>
      </div>
      <div class="step-card">
        <div class="step-number">2</div>
        <h2>Fach wählen</h2>
        <p>Wähle das Fach, in dem du Hilfe brauchst.</p>
      </div>
      <div class="step-card">
        <div class="step-number">3</div>
        <h2>Lehrer finden</h2>
        <p>Finde den passenden Lehrer für deine Bedürfnisse.</p>
      </div>
      <div class="step-card">
        <div class="step-number">4</div>
        <h2>Lernen starten</h2>
        <p>Starte mit der Nachhilfe und erreiche deine Ziele.</p>
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
  name: 'HowItWorksPage',
};
</script>

<style scoped>
/* General Styling */
.how-it-works-page {
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

/* Steps Section */
.steps {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  padding: 2rem;
}

.step-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  text-align: center;
  width: 280px;
  position: relative;
}

.step-number {
  position: absolute;
  top: -1rem;
  left: 50%;
  transform: translateX(-50%);
  background-color: #1d4069;
  color: #fff;
  font-size: 1.5rem;
  font-weight: bold;
  width: 40px;
  height: 40px;
  line-height: 40px;
  border-radius: 50%;
}

.step-card h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.step-card p {
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
