<template>
  <div class="admin-dashboard">
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

    <h2>Admin Dashboard</h2>

    <div class="user-section">
      <h3>Lehrer</h3>
      <table>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Aktionen</th>
        </tr>
        <tr v-for="lehrer in lehrerListe" :key="lehrer.id">
          <td>{{ lehrer.id }}</td>
          <td>{{ lehrer.vorname }} {{ lehrer.nachname }}</td>
          <td>{{ lehrer.email }}</td>
          <td>
            <button @click="bearbeiten(lehrer)">✏️</button>
            <button @click="loeschen(lehrer.id)">🗑️</button>
            <button @click="deaktivieren(lehrer.id)">🚫</button>
          </td>
        </tr>
      </table>
    </div>

    <div class="user-section">
      <h3>Schüler</h3>
      <table>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Aktionen</th>
        </tr>
        <tr v-for="schueler in schuelerListe" :key="schueler.id">
          <td>{{ schueler.id }}</td>
          <td>{{ schueler.vorname }} {{ schueler.nachname }}</td>
          <td>{{ schueler.email }}</td>
          <td>
            <button @click="bearbeiten(schueler)">✏️</button>
            <button @click="loeschen(schueler.id)">🗑️</button>
            <button @click="deaktivieren(schueler.id)">🚫</button>
          </td>
        </tr>
      </table>
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
      lehrerListe: [],
      schuelerListe: [],
    };
  },
  async created() {
    await this.ladeBenutzer();
  },
  methods: {
    async ladeBenutzer() {
      const lehrerRes = await axios.get('/api/lehrer');
      const schuelerRes = await axios.get('/api/schueler');
      this.lehrerListe = lehrerRes.data;
      this.schuelerListe = schuelerRes.data;
    },
    bearbeiten(user) {
      alert(`Bearbeiten: ${user.vorname} ${user.nachname}`);
    },
    async loeschen(id) {
      if (confirm('Möchten Sie diesen Benutzer wirklich löschen?')) {
        await axios.delete(`/api/user/${id}`);
        await this.ladeBenutzer();
      }
    },
    async deaktivieren(id) {
      await axios.put(`/api/user/${id}/deaktivieren`);
      await this.ladeBenutzer();
    },
  },
};
</script>

<style scoped>
.admin-dashboard {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}
.user-section {
  margin-top: 20px;
}
</style>
