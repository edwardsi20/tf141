<template>
  <div class="login-page">
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

    <section class="register-form">
      <div class="form-tabs">
        <button
          class="tab-button"
          :class="{ active: selectedRole === 'Schueler' }"
          @click="selectedRole = 'Schueler'"
        >
          Schüler
        </button>
        <button
          class="tab-button"
          :class="{ active: selectedRole === 'Lehrer' }"
          @click="selectedRole = 'Lehrer'"
        >
          Lehrer
        </button>
      </div>
      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label for="vorname">Vorname</label>
          <input type="text" id="vorname" v-model="vorname" required />
        </div>
        <div class="form-group">
          <label for="nachname">Nachname</label>
          <input type="text" id="nachname" v-model="nachname" required />
        </div>
        <div class="form-group">
          <label for="geburtsdatum">Geburtsdatum</label>
          <input type="date" id="geburtsdatum" v-model="geburtsdatum" required />
        </div>
        <div class="form-group">
          <label>Geschlecht</label>
          <div class="radio-group">
            <label><input type="radio" value="männlich" v-model="geschlecht" /> Männlich</label>
            <label><input type="radio" value="weiblich" v-model="geschlecht" /> Weiblich</label>
            <label
              ><input type="radio" value="keine Angabe" v-model="geschlecht" /> Keine Angabe</label
            >
          </div>
        </div>
        <div class="form-group">
          <label for="email">E-Mail</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div class="form-group">
          <label for="password">Passwort</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit" class="btn-primary">Registrieren</button>
      </form>
      <p class="login-link">Bereits ein Konto? <router-link to="/login">Einloggen</router-link></p>
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
import '@/assets/styles_login_register.css'; // Import der CSS-Datei
import axios from 'axios';

export default {
  name: 'RegisterPage',
  data() {
    return {
      selectedRole: 'Schueler', // Standardwert: Schüler
      vorname: '',
      nachname: '',
      geburtsdatum: '',
      geschlecht: '',
      email: '',
      password: '',
    };
  },
  methods: {
    async handleRegister() {
      try {
        const response = await axios.post('http://localhost:3000/api/register', {
          role: this.selectedRole,
          vorname: this.vorname,
          nachname: this.nachname,
          geburtsdatum: this.geburtsdatum,
          geschlecht: this.geschlecht,
          email: this.email,
          password: this.password,
        });
        alert(response.data.message);
        this.$router.push('/login'); // Weiterleitung nach erfolgreicher Registrierung
      } catch (error) {
        alert('Fehler bei der Registrierung: ' + error.response.data.message);
      }
    },
  },
};
</script>

<style scoped></style>
