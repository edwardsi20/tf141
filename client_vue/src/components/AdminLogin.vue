<template>
  <div class="admin-login">
    <!-- Header (hier unverändert) -->
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

    <h2>Admin Login</h2>
    <form @submit.prevent="login">
      <label>Email</label>
      <input type="email" v-model="email" required />

      <label>Passwort</label>
      <input type="password" v-model="passwort" required />

      <button type="submit">Login</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>

    <h2>Admin Registrierung</h2>
    <form @submit.prevent="register">
      <label>Vorname</label>
      <input type="text" v-model="vorname" required />

      <label>Nachname</label>
      <input type="text" v-model="nachname" required />

      <label>Email</label>
      <input type="email" v-model="regEmail" required />

      <label>Passwort</label>
      <input type="password" v-model="regPasswort" required />

      <button type="submit">Registrieren</button>
    </form>
    <p v-if="regError" class="error">{{ regError }}</p>

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
          <li><router-link to="/admin-login">Admin Login</router-link></li>
        </ul>
      </div>
    </footer>
  </div>
</template>

<script>
import '@/assets/styles.css';
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      passwort: '',
      error: '',
      vorname: '',
      nachname: '',
      regEmail: '',
      regPasswort: '',
      regError: '',
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('/api/admin/login', {
          email: this.email,
          passwort: this.passwort,
        });
        localStorage.setItem('adminToken', response.data.token);
        this.$router.push('/admin-dashboard');
      } catch (err) {
        this.error = 'Fehler beim Login. Bitte überprüfen Sie Ihre Daten.';
      }
    },
    async register() {
      try {
        await axios.post('/api/admin/register', {
          vorname: this.vorname,
          nachname: this.nachname,
          email: this.regEmail,
          passwort: this.regPasswort,
        });
        alert('Admin erfolgreich registriert! Jetzt einloggen.');
      } catch (err) {
        this.regError = 'Fehler bei der Registrierung. Bitte überprüfen Sie Ihre Daten.';
      }
    },
  },
};
</script>

<style scoped>
.admin-login {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  text-align: center;
}
.error {
  color: red;
}
</style>
