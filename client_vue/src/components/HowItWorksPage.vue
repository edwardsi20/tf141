<template>
  <div class="hiw-page">
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

    <!-- Schritt-für-Schritt-Anleitung -->
    <div class="list-of-steps">
      <!-- Schritt 1 -->
      <div class="step ecl-u-d-flex">
        <div class="step-symbol ecl-u-mv-m">1</div>
        <div class="ecl-row ecl-u-ph-l ecl-u-width-100">
          <div class="ecl-col-m-12">
            <h2 class="ecl-u-type-heading-2">Schritt 1: Erstelle ein Konto</h2>
          </div>
          <div class="ecl-col-m-7">
            <p>
              Registriere dich in wenigen Schritten und erhalte Zugang zu einer breiten Auswahl an
              hochqualifizierten Lehrern. Dein Konto dient als zentrale Plattform, um alle deine
              Nachhilfeaktivitäten zu verwalten.
            </p>
          </div>
          <div class="ecl-col-m-5">
            <img
              loading="lazy"
              src="../assets/img/account.jpg"
              alt="Schritt 1: Erstelle ein Konto"
              class="ecl-media-container__media"
              width="15%"
              height="auto"
            />
          </div>
        </div>
      </div>

      <!-- Schritt 2 -->
      <div class="step ecl-u-d-flex">
        <div class="step-symbol ecl-u-mv-m">2</div>
        <div class="ecl-row ecl-u-ph-l ecl-u-width-100">
          <div class="ecl-col-m-12">
            <h2 class="ecl-u-type-heading-2">Schritt 2: Buche eine Nachhilfestunde</h2>
          </div>
          <div class="ecl-col-m-7">
            <p>
              Durchstöbere die Profile unserer Lehrer und finde den perfekten Lehrer für deine
              Bedürfnisse. Wähle einen passenden Termin und buche direkt online.
            </p>
          </div>
          <div class="ecl-col-m-5">
            <img
              loading="lazy"
              src="../assets/img/book.jpg"
              alt="Schritt 2: Buche eine Nachhilfestunde"
              class="ecl-media-container__media"
              width="15%"
              height="auto"
            />
          </div>
        </div>
      </div>

      <!-- Schritt 3 -->
      <div class="step ecl-u-d-flex">
        <div class="step-symbol ecl-u-mv-m">3</div>
        <div class="ecl-row ecl-u-ph-l ecl-u-width-100">
          <div class="ecl-col-m-12">
            <h2 class="ecl-u-type-heading-2">Schritt 3: Genieße hochqualitativen Unterricht</h2>
          </div>
          <div class="ecl-col-m-7">
            <p>
              Lerne in einer angenehmen Umgebung und profitiere von der Expertise unserer erfahrenen
              Lehrer. Verfolge deine Fortschritte und erreiche deine Lernziele schneller.
            </p>
          </div>
          <div class="ecl-col-m-5">
            <img
              loading="lazy"
              src="../assets/img/enjoy.jpg"
              alt="Schritt 3: Genieße hochqualitativen Unterricht"
              class="ecl-media-container__media"
              width="15%"
              height="auto"
            />
          </div>
        </div>
      </div>
    </div>

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
