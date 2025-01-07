<template>
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
            <button @click="logout">Ausloggen</button>
          </div>
        </li>
      </ul>
    </nav>
  </header>

  <div class="search-results">
    <h2>Suchergebnisse für "{{ $route.query.search || 'Alle Lehrer' }}"</h2>
    <div v-if="filteredTeachers.length > 0" class="results-list">
      <div v-for="teacher in filteredTeachers" :key="teacher.lehrerid" class="teacher-card">
        <img :src="teacher.profileImage || defaultImage" alt="Profilbild" class="profile-image" />
        <div class="teacher-info">
          <h3>{{ teacher.vorname }} {{ teacher.nachname }}</h3>
          <p id="found_teachers">Erfahrung: {{ teacher.erfahrung || 'N/A' }} Jahre</p>
          <button @click="contactTeacher(teacher.email)" class="btn-primary">Kontaktieren</button>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Keine Ergebnisse gefunden.</p>
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
</template>

<script>
import '@/assets/styles.css'; // Import der CSS-Datei
import axios from 'axios';

export default {
  name: 'SearchResults',
  data() {
    return {
      filteredTeachers: [], // Filtered results
      defaultImage:
        'https://www.clipartmax.com/png/middle/33-335657_tutoring-clipart-tutor-icon-png.png',
    };
  },
  created() {
    this.performSearch();
  },
  methods: {
    async performSearch() {
      const query = this.$route.query.search?.toLowerCase() || '';
      try {
        const response = await axios.get(`http://localhost:3000/api/lehrer/search?q=${query}`);
        this.filteredTeachers = response.data;
      } catch (error) {
        console.error('Fehler bei der Suche:', error);
        this.filteredTeachers = []; // Reset on error
      }
    },
    contactTeacher(email) {
      alert(`Kontakt zu ${email} aufnehmen.`);
    },
  },
};
</script>

<style scoped></style>
