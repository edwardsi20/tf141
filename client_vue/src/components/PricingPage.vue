<template>
  <div class="pricing-page">
    <!-- Header -->
    <header class="header">
      <nav class="navbar">
        <div class="navbar-left">
          <img src="../assets/img/logo.jpg" alt="Logo" class="navbar-logo" />
          <router-link to="/" class="navbar-brand">StudyPortal</router-link>
        </div>
        <ul class="navbar-links">
          <li><router-link to="/subjects">Schulfächer</router-link></li>
          <li><router-link to="/how-it-works">So geht's</router-link></li>
          <li><router-link to="/pricing">Preise</router-link></li>
          <li><router-link to="/contact">Kontakt</router-link></li>
          <li v-if="!user"><router-link to="/login" class="btn-login">Login</router-link></li>
          <li v-if="user" class="profile-nav" @mouseleave="dropdownVisible = false">
            <div @mouseover="dropdownVisible = true">
              <div class="profile-link">
                <img :src="profileImage" alt="Profilbild" class="profile-image" />
                <span class="profile-name">{{ user.vorname }} {{ user.nachname }}</span>
                <span class="profile-arrow">🠻</span>
              </div>
            </div>
            <div v-if="dropdownVisible" class="dropdown">
              <button @click="logout">Ausloggen</button>
            </div>
          </li>
        </ul>
      </nav>
    </header>

    <!-- Pricing Section -->
    <section class="pricing-section">
      <h1 class="pricing-title">Unsere Pläne</h1>
      <div class="pricing-cards">
        <!-- Light Package -->
        <div class="pricing-card">
          <h2>Einzelunterricht</h2>
          <p class="plan-description">Perfekt für flexibles Lernen</p>
          <p class="price">Individuell<span></span></p>
          <ul class="features">
            <li>✔ Einzelne Nachhilfestunde</li>
            <li>✔ Individuelle Preisgestaltung durch den Lehrer</li>
            <li>✔ Direkte Terminvereinbarung</li>
          </ul>
          <p>🔹 Ideal für spontane Nachhilfestunden</p>
          <button class="cta-button">Mehr erfahren</button>
        </div>

        <!-- Business Package -->
        <div class="pricing-card recommended">
          <h2>Study+</h2>
          <p class="plan-description">Für regelmäßige Lernunterstützung</p>
          <p class="price">€24,99<span>/Monat</span></p>
          <ul class="features">
            <li>✔ Alle Vorteile des Einzelunterrichts</li>
            <li>✔ Fixe wöchentliche Unterrichtseinheiten</li>
            <li>✔ Priorisierte Terminvergabe</li>
            <li>✔ Zugang zu exklusiven Lernmaterialien</li>
          </ul>
          <p>🔹 Perfekt für Schüler mit festen Lernzielen</p>
          <button class="cta-button">Empfohlen</button>
        </div>

        <!-- Elite Package -->
        <!-- <div class="pricing-card">
          <h2>Elite</h2>
          <p class="plan-description">Das Rundum-Sorglos-Paket</p>
          <p class="price">€149,99<span>/Monat</span></p>
          <ul class="features">
            <li>Alles aus dem Business-Paket plus</li>
            <li>24/7 persönlicher Support & Beratung</li>
            <li>Maßgeschneiderte Lernpläne</li>
            <li>Klare Lehrerempfehlungen</li>
            <li>25% Rabatt auf jede Nachhilfestunde</li>
          </ul>
          <button class="cta-button">Premium buchen</button>
        </div> -->
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-content">
        <p>© 2025 Nachhilfebörse</p>
        <ul class="footer-links">
          <li><router-link to="/imprint">Impressum</router-link></li>
          <li><router-link to="/privacy">Datenschutz</router-link></li>
          <li><router-link to="/contact">Kontakt</router-link></li>
          <li><router-link to="/aboutus">Über uns</router-link></li>
          <li><router-link to="/helpandfaq">Hilfe/FAQ</router-link></li>
        </ul>
      </div>
    </footer>
  </div>
</template>

<script>
import '@/assets/styles.css'; // Import der CSS-Datei

export default {
  data() {
    return {
      searchQuery: '', // Für die Suchleiste
      user: null,
      dropdownVisible: false,
      profileImage:
        'https://cdn.vectorstock.com/i/1000v/92/16/default-profile-picture-avatar-user-icon-vector-46389216.jpg',
    };
  },
  created() {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedData = JSON.parse(userData);
      this.user = {
        vorname: parsedData.Vorname, // Umbenennung in Kleinbuchstaben
        nachname: parsedData.Nachname, // Umbenennung in Kleinbuchstaben
        email: parsedData.Email,
        id: parsedData.id,
      };
    }
  },
  methods: {
    logout() {
      localStorage.clear();
      this.user = null;
      this.$router.push('/');
    },
  },
};
</script>

<style scoped></style>
