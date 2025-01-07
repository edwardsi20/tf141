<template>
  <div class="homepage">
    <!-- Header -->
    <header class="header">
      <nav class="navbar">
        <router-link to="/" class="navbar-brand">Nachhilfebörse</router-link>
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
              <button @click="goToProfile">Mein Profil</button>
              <button @click="logout">Ausloggen</button>
            </div>
          </li>
        </ul>
      </nav>
    </header>

    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1>Finde die beste Nachhilfe für dich</h1>
        <p>Verbessere deine Fähigkeiten mit qualifizierten Lehrern</p>
        <div class="search-bar">
          <input
            type="text"
            placeholder="Lehrer oder Fach suchen"
            v-model="searchQuery"
            class="search-input"
          />
          <router-link
            :to="{ name: 'SearchResults', query: { search: searchQuery } }"
            class="btn-primary"
          >
            Suchen
          </router-link>
        </div>
      </div>
      <div class="hero-overlay"></div>
    </section>

    <!-- Beliebte Fächer Section -->
    <section class="beliebte-faecher">
      <h2>Beliebte Fächer</h2>
      <div class="faecher-grid">
        <div class="fach-card">
          <span class="fach-icon">📐</span>
          <span class="fach-name">Mathematik</span>
        </div>
        <div class="fach-card">
          <span class="fach-icon">📚</span>
          <span class="fach-name">Deutsch</span>
        </div>
        <div class="fach-card">
          <span class="fach-icon">🇬🇧</span>
          <span class="fach-name">Englisch</span>
        </div>
        <div class="fach-card">
          <span class="fach-icon">🌱</span>
          <span class="fach-name">Biologie</span>
        </div>
        <div class="fach-card">
          <span class="fach-icon">⚛️</span>
          <span class="fach-name">Physik</span>
        </div>
        <div class="fach-card">
          <span class="fach-icon">🧪</span>
          <span class="fach-name">Chemie</span>
        </div>
        <div class="fach-card">
          <span class="fach-icon">📜</span>
          <span class="fach-name">Geschichte</span>
        </div>
        <div class="fach-card">
          <span class="fach-icon">🗺️</span>
          <span class="fach-name">Geographie</span>
        </div>
      </div>
    </section>

    <!-- Professionelle Trennlinie -->
    <div class="divider"></div>

    <!-- Vorteile Section -->
    <section class="vorteile">
      <h2>Warum Nachhilfebörse?</h2>
      <div class="vorteile-grid">
        <div class="vorteil-card">
          <h3>📅 Flexible Termine</h3>
          <p>Plane deine Nachhilfe ganz nach deinem Zeitplan.</p>
        </div>
        <div class="vorteil-card">
          <h3>💻 Online & Vor Ort</h3>
          <p>Lerne bequem online oder treffe dich persönlich.</p>
        </div>
        <div class="vorteil-card">
          <h3>🏆 Qualifizierte Lehrer</h3>
          <p>Alle Lehrer sind geprüft und spezialisiert.</p>
        </div>
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
    goToProfile() {
      this.$router.push('/myprofile'); // Weiterleitung zur Profilseite
    },
  },
};
</script>

<style scoped></style>
