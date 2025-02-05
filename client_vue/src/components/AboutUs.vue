<template>
  <div class="aboutus-page">
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

    <!-- About Us Section -->
    <section class="aboutus-section">
      <h1 class="section-title">Unser Team</h1>
      <div class="team-container">
        <div
          v-for="(member, index) in team"
          :key="index"
          class="team-row"
          @click="toggleRow(index)"
        >
          <div class="profile-pic">
            <img :src="member.image" :alt="member.name" />
          </div>
          <div class="profile-info">
            <h3>{{ member.name }}</h3>
            <p class="description" :class="{ expanded: activeRow === index }">
              {{ member.description }}
            </p>
          </div>
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
      activeRow: null, // Aktives Team-Mitglied
      team: [
        {
          name: 'Ibrahim Edwards',
          image: new URL('../assets/img/fc.jpg', import.meta.url).href,
          description:
            'Projektmanager. Verantwortlich für Planung, Koordination und Erfolg des Projekts. Entwicklung der Start- & Unterseiten.',
        },
        {
          name: 'Sebastian Amir Herhesh',
          image: new URL('../assets/img/sh.jpg', import.meta.url).href,
          description:
            'Co-Mitarbeiter an der Website: Zuständig für Videochat, Chatsystem, Buchung, Zahlung...',
        },
        {
          name: 'Abd Al Majeed Abo Hassan',
          image: new URL('../assets/img/ah.jpg', import.meta.url).href,
          description:
            'Der Android-Entwickler des Teams: Zuständig für die mobile Form der Nachhilfebörse.',
        },
      ],
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
    toggleRow(index) {
      this.activeRow = this.activeRow === index ? null : index;
    },
  },
};
</script>

<style scoped></style>
