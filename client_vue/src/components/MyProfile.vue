<template>
  <div class="imprint-page">
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

    <!-- Profilformular -->
    <section class="profile-form">
      <div class="profile-container">
        <h1>Mein Profil</h1>
        <form @submit.prevent="updateProfile" class="profile-form-content">
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
              <label>
                <input type="radio" value="männlich" v-model="profile.geschlecht" />
                <span class="custom-radio"></span> Männlich
              </label>
              <label>
                <input type="radio" value="weiblich" v-model="profile.geschlecht" />
                <span class="custom-radio"></span> Weiblich
              </label>
              <label>
                <input type="radio" value="keine Angabe" v-model="profile.geschlecht" />
                <span class="custom-radio"></span> Keine Angabe
              </label>
            </div>
          </div>
          <button type="submit" class="btn-primary">Speichern</button>
        </form>
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
          <li><router-link to="/admin-login">Admin Login</router-link></li>
        </ul>
      </div>
    </footer>
  </div>
</template>

<script>
import '@/assets/styles.css';
import '@/assets/styles_myprofile.css';
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
      originalProfile: null,
      notification: {
        visible: false,
        message: '',
        type: '', // 'success' oder 'error'
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
        const data = response.data;
        let geburtsdatum = '';

        if (data.Geburtsdatum) {
          // Stelle sicher, dass das Datum exakt so übernommen wird, wie es in der Datenbank gespeichert ist.
          const dateParts = data.Geburtsdatum.split('-'); // Erwartetes Format: "YYYY-MM-DD"
          const year = parseInt(dateParts[0], 10);
          const month = parseInt(dateParts[1], 10) - 1; // Monate sind 0-basiert
          const day = parseInt(dateParts[2], 10) + 1; // Fix: +1 zum Tag addieren

          // Erstelle ein UTC-basiertes Date-Objekt, um Zeitzonenprobleme zu vermeiden
          const dateObj = new Date(Date.UTC(year, month, day));

          // Formatierung in "YYYY-MM-DD", damit es korrekt im Input-Feld angezeigt wird
          const formattedYear = dateObj.getUTCFullYear();
          const formattedMonth = ('0' + (dateObj.getUTCMonth() + 1)).slice(-2);
          const formattedDay = ('0' + dateObj.getUTCDate()).slice(-2);
          geburtsdatum = `${formattedYear}-${formattedMonth}-${formattedDay}`;
        }

        this.profile = {
          vorname: data.Vorname,
          nachname: data.Nachname,
          email: data.Email,
          geburtsdatum: geburtsdatum, // Jetzt korrekt ohne Zeitzonenverschiebung
          geschlecht: data.Geschlecht,
        };

        // Speichere die Originaldaten zum Vergleich bei Updates
        this.originalProfile = JSON.parse(JSON.stringify(this.profile));
      } catch (error) {
        console.error('Fehler beim Laden des Profils:', error);
      }
    },

    async updateProfile() {
      // Nur dann senden, wenn sich etwas geändert hat
      if (JSON.stringify(this.profile) === JSON.stringify(this.originalProfile)) {
        console.log('Keine Änderungen erkannt.');
        return;
      }
      try {
        console.log('Update-Daten vor Senden:', this.profile);
        await axios.put(`http://localhost:3000/api/profile/${this.user.id}`, this.profile);
        // Originaldaten aktualisieren
        this.originalProfile = JSON.parse(JSON.stringify(this.profile));
      } catch (error) {
        console.error('Fehler beim Aktualisieren des Profils:', error);
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

<!-- Du kannst den nachstehenden CSS-Code in eine externe Datei (z. B. notification.css) auslagern -->
<style scoped></style>
