<template>
  <div class="contact-page">
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

    <!-- Kontaktformular -->
    <section class="contact-form-section">
      <h1>Kontaktieren Sie uns</h1>
      <form @submit.prevent="submitForm" class="contact-form">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" id="name" v-model="formData.name" placeholder="Ihr Name" required />
        </div>
        <div class="form-group">
          <label for="email">E-Mail</label>
          <input
            type="email"
            id="email"
            v-model="formData.email"
            placeholder="Ihre E-Mail-Adresse"
            required
          />
        </div>
        <div class="form-group">
          <label for="subject">Betreff</label>
          <input
            type="text"
            id="subject"
            v-model="formData.subject"
            placeholder="Betreff der Nachricht"
            required
          />
        </div>
        <div class="form-group">
          <label for="message">Nachricht</label>
          <textarea
            id="message"
            v-model="formData.message"
            placeholder="Ihre Nachricht"
            rows="5"
            required
          ></textarea>
        </div>
        <button type="submit" class="submit-button">Absenden</button>
      </form>
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
import axios from 'axios';

export default {
  data() {
    return {
      searchQuery: '', // Für die Suchleiste
      user: null,
      dropdownVisible: false,
      profileImage:
        'https://cdn.vectorstock.com/i/1000v/92/16/default-profile-picture-avatar-user-icon-vector-46389216.jpg',
      formData: {
        name: '',
        email: '',
        subject: '',
        message: '',
      },
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
    async submitForm() {
      try {
        const response = await axios.post('http://localhost:3000/send-email', this.formData);
        alert('Nachricht erfolgreich gesendet!');
        this.formData = {
          name: '',
          email: '',
          subject: '',
          message: '',
        };
      } catch (error) {
        console.error(error);
        alert('Fehler beim Senden der Nachricht.');
      }
    },
  },
};
</script>

<style scoped></style>
