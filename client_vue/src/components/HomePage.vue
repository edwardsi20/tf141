<template>
  <div class="homepage">
    <!-- Header -->
    <header class="header">
      <nav class="navbar">
        <router-link to="/" class="navbar-brand">Nachhilfebörse</router-link>
        <ul class="navbar-links">
          <li><router-link to="/subjects">Schulfächer</router-link></li>
          <li><router-link to="/how-it-works">So geht's</router-link></li>
          <li><router-link to="/info">Infos</router-link></li>
          <li><router-link to="/pricing">Preise</router-link></li>
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

    <!-- Hero Section -->
    <section class="hero">
      <h1>Finde die beste Nachhilfe für dich</h1>
      <p>Verbessere deine Fähigkeiten mit qualifizierten Lehrern</p>
      <div class="search-bar">
        <input type="text" placeholder="Lehrer oder Fach suchen" v-model="searchQuery" />
        <router-link
          :to="{ name: 'SearchResults', query: { search: searchQuery } }"
          class="btn-primary"
          >Suchen</router-link
        >
      </div>
    </section>

    <!-- Beliebte Fächer Section -->
    <section class="beliebte-faecher">
      <h2>Beliebte Fächer</h2>
      <div class="faecher-grid">
        <div class="fach-card">
          <span>📐</span>
          <span>Mathematik</span>
        </div>
        <div class="fach-card">
          <span>📚</span>
          <span>Deutsch</span>
        </div>
        <div class="fach-card">
          <span>🇬🇧</span>
          <span>Englisch</span>
        </div>
        <div class="fach-card">
          <span>🌱</span>
          <span>Biologie</span>
        </div>
        <div class="fach-card">
          <span>⚛️</span>
          <span>Physik</span>
        </div>
        <div class="fach-card">
          <span>🧪</span>
          <span>Chemie</span>
        </div>
        <div class="fach-card">
          <span>📜</span>
          <span>Geschichte</span>
        </div>
        <div class="fach-card">
          <span>🗺️</span>
          <span>Geographie</span>
        </div>
        <div class="fach-card">
          <span>🇦🇱</span>
          <span>Albanisch</span>
        </div>
      </div>
    </section>

    <!-- Vorteile Section -->
    <section class="vorteile">
      <h2>Warum Nachhilfebörse?</h2>
      <div class="vorteile-grid">
        <div class="vorteil-card">
          <h3>📅 Flexible Termine</h3>
          <p>Plane deine Nachhilfe ganz nach deinem Zeitplan.</p>
        </div>
        <div class="vorteil-card">
          <h3>💻 Online & Vor Ort</h3>
          <p>Lerne bequem online oder treffe dich persönlich.</p>
        </div>
        <div class="vorteil-card">
          <h3>🏆 Qualifizierte Lehrer</h3>
          <p>Alle Lehrer sind geprüft und spezialisiert.</p>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <p>© 2023 Nachhilfebörse</p>
      <ul class="footer-links">
        <li><router-link to="/impressum">Impressum</router-link></li>
        <li><router-link to="/privacy">Datenschutz</router-link></li>
        <li><router-link to="/contact">Kontakt</router-link></li>
      </ul>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '', // Für die Suchleiste
      user: null,
      dropdownVisible: false,
      profileImage:
        'https://cdn.vectorstock.com/i/1000v/92/16/default-profile-picture-avatar-user-icon-vector-46389216.jpg',
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
  },
};
</script>

<style scoped>
/* General Styling */
.homepage {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: Arial, sans-serif;
  color: #333;
}

/* Navbar */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #1d4069;
  color: #fff;
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
  text-decoration: none;
}

.navbar-links {
  list-style: none;
  display: flex;
  gap: 1rem;
  margin: 0;
}

.navbar-links li a {
  color: #fff;
  text-decoration: none;
  font-weight: bold;
}

.btn-login {
  background-color: #1dace0;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  color: #fff;
}

/* Hero Section */
.hero {
  text-align: center;
  padding: 4rem 1rem;
  background: linear-gradient(to bottom, #1dace0, #1d4069);
  color: #fff;
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.hero p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

.search-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.search-bar input {
  padding: 0.8rem;
  border-radius: 5px;
  border: none;
  width: 300px;
  font-size: 1rem;
}

.btn-primary {
  background-color: #1d4069;
  color: #fff;
  padding: 0.8rem 1.5rem;
  text-decoration: none;
  font-weight: bold;
  border-radius: 5px;
}

/* Beliebte Fächer Section */
.beliebte-faecher {
  text-align: center;
  padding: 2rem;
  background-color: #f9f9f9;
}

.faecher-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

/* .fach-card {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  width: 120px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
} */

.fach-card {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  width: 120px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center; /* Zentriert den Inhalt horizontal */
  justify-content: center; /* Zentriert den Inhalt vertikal */
  gap: 0.5rem; /* Abstand zwischen Emoji und Text */
  font-size: 1rem;
}

/* Vorteile Section */
.vorteile {
  text-align: center;
  padding: 2rem;
}

.vorteile-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
}

.vorteil-card {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  width: 250px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Footer */
.footer {
  margin-top: auto;
  text-align: center;
  padding: 2rem;
  background-color: #333;
  color: #fff;
}

.footer-links {
  list-style: none;
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 1rem 0 0;
  padding: 0;
}

.footer-links li a {
  color: #1dace0;
  text-decoration: none;
}

.profile-nav {
  position: relative;
}

.profile-menu {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
}

.profile-image {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 2px solid #1dace0;
}

.profile-name {
  font-weight: bold;
  color: #fff;
}

.profile-arrow {
  cursor: pointer;
  color: #fff;
  font-size: 1rem;
}

.profile-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000; /* Damit das Dropdown immer oben bleibt */
}
</style>
