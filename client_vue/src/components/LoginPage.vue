<template>
  <div class="login-page">
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

    <section class="login-form">
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">E-Mail</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div class="form-group">
          <label for="password">Passwort</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit" class="btn-primary">Einloggen</button>
      </form>
      <p class="register-link">
        Noch kein Konto? <router-link to="/register">Registrieren</router-link>
      </p>
    </section>
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
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await axios.post('http://localhost:3000/api/login', {
          email: this.email,
          password: this.password,
        });

        const user = response.data.user;
        const role = response.data.role;

        // Benutzerinformationen im lokalen Speicher speichern
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('role', role);

        // Weiterleitung zur Startseite
        this.$router.push('/');
      } catch (error) {
        alert('Login fehlgeschlagen: Ungültige E-Mail oder Passwort');
      }
    },
  },
};
</script>

<style scoped></style>
