<template>
  <div class="pricing-page">
    <header class="header">
      <h1>Preise</h1>
    </header>
    <section class="pricing-plans">
      <div class="plan-card">
        <h2>Basic</h2>
        <p>Ideal für Anfänger.</p>
        <p class="price">€9.99/Monat</p>
        <button class="btn-primary">Wählen</button>
      </div>
      <div class="plan-card">
        <h2>Pro</h2>
        <p>Für Fortgeschrittene.</p>
        <p class="price">€19.99/Monat</p>
        <button class="btn-primary">Wählen</button>
      </div>
      <div class="plan-card">
        <h2>Premium</h2>
        <p>Umfassende Unterstützung.</p>
        <p class="price">€29.99/Monat</p>
        <button class="btn-primary">Wählen</button>
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
  name: 'PricingPage',
};
</script>

<style scoped>
/* General Styling */
.pricing-page {
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

/* Pricing Plans Section */
.pricing-plans {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  padding: 2rem;
}

.plan-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  text-align: center;
  width: 300px;
}

.plan-card h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.plan-card .price {
  font-size: 1.2rem;
  font-weight: bold;
  margin: 1rem 0;
}

.btn-primary {
  padding: 0.8rem 1.5rem;
  background-color: #1d4069;
  color: #fff;
  text-decoration: none;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
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
