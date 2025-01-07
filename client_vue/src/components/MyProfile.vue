<template>
  <div class="imprint-page">
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

    <!-- Profile Form -->
    <section class="profile-form">
      <h1>Mein Profil</h1>
      <form @submit.prevent="updateProfile">
        <div class="form-group">
          <label for="vorname">Vorname</label>
          <input type="text" id="vorname" v-model="profile.vorname" required />
        </div>
        <div class="form-group">
          <label for="nachname">Nachname</label>
          <input type="text" id="nachname" v-model="profile.nachname" required />
        </div>
        <div class="form-group">
          <label for="email">E-Mail</label>
          <input type="email" id="email" v-model="profile.email" required />
        </div>
        <div class="form-group">
          <label for="geburtsdatum">Geburtsdatum</label>
          <input type="date" id="geburtsdatum" v-model="profile.geburtsdatum" required />
        </div>
        <div class="form-group">
          <label>Geschlecht</label>
          <div class="radio-group">
            <label
              ><input type="radio" value="männlich" v-model="profile.geschlecht" /> Männlich</label
            >
            <label
              ><input type="radio" value="weiblich" v-model="profile.geschlecht" /> Weiblich</label
            >
            <label
              ><input type="radio" value="keine Angabe" v-model="profile.geschlecht" /> Keine
              Angabe</label
            >
          </div>
        </div>
        <button type="submit" class="btn-primary">Speichern</button>
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
      user: null,
      dropdownVisible: false,
      profileImage:
        'https://cdn.vectorstock.com/i/1000v/92/16/default-profile-picture-avatar-user-icon-vector-46389216.jpg',
      profile: {
        vorname: '',
        nachname: '',
        email: '',
        geburtsdatum: '',
        geschlecht: '',
      },
    };
  },
  created() {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
      this.loadProfile();
    }
  },
  methods: {
    async loadProfile() {
      try {
        const response = await axios.get(`http://localhost:3000/api/profile/${this.user.id}`);
        this.profile = response.data;
      } catch (error) {
        console.error('Fehler beim Laden des Profils:', error);
      }
    },
    async updateProfile() {
      console.log(this.profile); // Überprüfe die gesendeten Daten
      try {
        await axios.put(`http://localhost:3000/api/profile/${this.user.id}`, this.profile);
        alert('Profil erfolgreich aktualisiert.');
      } catch (error) {
        console.error('Fehler beim Aktualisieren des Profils:', error);
        alert('Fehler beim Speichern des Profils.');
      }
    },
    logout() {
      localStorage.clear();
      this.user = null;
      this.$router.push('/');
    },
  },
};
</script>

<style scoped></style>
