<template>
  <div class="homepage">
    <!-- Header -->
    <header class="header">
      <nav class="navbar">
        <a class="navbar-brand" href="/">Nachhilfebörse</a>
        <ul class="navbar-links">
          <li><a href="/subjects">Schulfächer</a></li>
          <li><a href="/how-it-works">So geht's</a></li>
          <li><a href="/info">Infos</a></li>
          <li><a href="/pricing">Preise</a></li>
          <li><a href="/login" class="btn-login">Login</a></li>
        </ul>
      </nav>
    </header>

    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1>Finde die beste Nachhilfe für dich</h1>
        <p>Verbessere deine Fähigkeiten mit qualifizierten Lehrern</p>
        <div class="search-bar">
          <input v-model="searchQuery" type="text" placeholder="Lehrer oder Fach suchen" />
          <button @click="performSearch">Suchen</button>
        </div>
      </div>
    </section>

    <!-- Subjects Section -->
    <section class="subjects-section">
      <h2>Beliebte Fächer</h2>
      <div class="subjects-grid">
        <div v-for="subject in popularSubjects" :key="subject.name" class="subject-card">
          <i :class="'icon-' + subject.icon"></i>
          <span>{{ subject.name }}</span>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <h2>So geht's</h2>
      <div class="features-grid">
        <div v-for="feature in features" :key="feature.title" class="feature-card">
          <i :class="'icon-' + feature.icon"></i>
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.description }}</p>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <p>&copy; 2023 Nachhilfebörse</p>
      <div class="footer-links">
        <a href="#">Impressum</a> | <a href="#">Datenschutz</a> | <a href="#">Kontakt</a>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      searchQuery: '', // Holds the search input
      popularSubjects: [
        { name: 'Mathematik', icon: 'mathematik' },
        { name: 'Deutsch', icon: 'deutsch' },
        { name: 'Englisch', icon: 'englisch' },
        { name: 'Biologie', icon: 'biologie' },
        { name: 'Physik', icon: 'physik' },
        { name: 'Chemie', icon: 'chemie' },
      ],
      features: [
        {
          title: 'Lernvideos schauen',
          description: 'Schau Videos in deinem Tempo.',
          icon: 'videos',
        },
        {
          title: 'Übungen machen',
          description: 'Spielerisch lernen mit Übungen.',
          icon: 'exercises',
        },
        {
          title: 'Vokabeln lernen',
          description: 'Effektiv Vokabeln trainieren.',
          icon: 'vocabulary',
        },
      ],
    };
  },
  methods: {
    performSearch() {
      // Redirect to SearchResults with the search query as a URL parameter
      this.$router.push({ name: 'SearchResults', query: { q: this.searchQuery } });
    },
  },
};
</script>

<style scoped>
.homepage {
  font-family: Arial, sans-serif;
}

.header {
  background-color: #1d4069;
  color: #fff;
  padding: 10px 20px;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-links {
  display: flex;
  list-style: none;
  gap: 20px;
}

.navbar-links a {
  color: #fff;
  text-decoration: none;
}

.btn-login {
  background-color: #2dbfd6;
  padding: 8px 16px;
  border-radius: 4px;
  color: #fff;
}

.hero {
  background: linear-gradient(135deg, #2b8db3, #1565c0);
  color: #fff;
  height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.hero-content h1 {
  font-size: 2.5em;
  margin-bottom: 0.3em;
}

.search-bar {
  margin-top: 1em;
  display: flex;
  align-items: center;
}

.search-bar input {
  padding: 10px;
  width: 300px;
  border: 1px solid #1976d2;
  border-radius: 25px;
  margin-right: 10px;
}

.search-bar button {
  padding: 10px 20px;
  background-color: #1976d2;
  color: #fff;
  border: none;
  border-radius: 25px;
  cursor: pointer;
}

.subjects-section,
.features-section {
  padding: 40px;
  text-align: center;
}

.subjects-grid,
.features-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.subject-card,
.feature-card {
  background-color: #f1f1f1;
  padding: 20px;
  width: 150px;
  text-align: center;
  border-radius: 8px;
}

.footer {
  background-color: #333;
  color: #fff;
  text-align: center;
  padding: 20px;
}

.footer-links a {
  color: #81d4fa;
  text-decoration: none;
  margin: 0 5px;
}
</style>
