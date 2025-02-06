<template>
  <div class="imprint-page">
    <!-- Push-Benachrichtigung -->
    <transition name="slide-down">
      <div v-if="notification.visible" :class="['notification', notification.type]">
        <span class="icon">
          <template v-if="notification.type === 'success'">✔</template>
          <template v-else-if="notification.type === 'error'">✖</template>
        </span>
        <span class="message">{{ notification.message }}</span>
      </div>
    </transition>

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

    <!-- Profile Form -->
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
        // Datumskonvertierung mit Berücksichtigung des Zeitzonenoffsets
        let d = new Date(data.Geburtsdatum);
        d.setMinutes(d.getMinutes() + d.getTimezoneOffset());
        this.profile = {
          vorname: data.Vorname,
          nachname: data.Nachname,
          email: data.Email,
          geburtsdatum: d.toISOString().substr(0, 10),
          geschlecht: data.Geschlecht,
        };
        // Speichere eine Kopie der Originaldaten
        this.originalProfile = JSON.parse(JSON.stringify(this.profile));
      } catch (error) {
        console.error('Fehler beim Laden des Profils:', error);
      }
    },
    async updateProfile() {
      // Prüfen, ob sich wirklich etwas geändert hat
      if (JSON.stringify(this.profile) === JSON.stringify(this.originalProfile)) {
        console.log('Keine Änderungen erkannt.');
        return;
      }
      try {
        console.log('Update-Daten vor Senden:', this.profile);
        await axios.put(`http://localhost:3000/api/profile/${this.user.id}`, this.profile);
        // Originaldaten aktualisieren
        this.originalProfile = JSON.parse(JSON.stringify(this.profile));
        this.showNotification('Profil erfolgreich aktualisiert.', 'success');
      } catch (error) {
        console.error('Fehler beim Aktualisieren des Profils:', error);
        this.showNotification('Fehler beim Speichern des Profils.', 'error');
      }
    },
    logout() {
      localStorage.clear();
      this.user = null;
      this.$router.push('/');
    },
    showNotification(message, type) {
      this.notification.message = message;
      this.notification.type = type;
      this.notification.visible = true;
      // Automatisches Ausblenden nach 3 Sekunden
      setTimeout(() => {
        this.notification.visible = false;
      }, 3000);
    },
  },
};
</script>

<style scoped></style>
