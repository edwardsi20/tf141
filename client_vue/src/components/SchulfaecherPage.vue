<template>
  <div class="schulfaecher-page">
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

    <!-- Fächer Übersicht Section -->
    <section class="beliebte-faecher">
      <h2>Fächer Übersicht</h2>
      <div class="faecher-grid">
        <div
          class="fach-card cursor"
          v-for="fach in subjects"
          :key="fach.name"
          @click="selectSubject(fach)"
        >
          <span class="fach-icon">{{ fach.icon }}</span>
          <span class="fach-name">{{ fach.name }}</span>
        </div>
      </div>
    </section>

    <!-- Divider -->
    <div class="divider"></div>

    <!-- Selected Subject Section -->
    <section class="top-faecher">
      <h2 class="placeholder-container" v-if="!selectedSubject">
        🖱️ Klicke auf ein Fach, um mehr darüber zu erfahren!
      </h2>
      <h2 v-else>Details zum Fach</h2>
      <transition name="fade">
        <div v-if="selectedSubject" class="fach-detail-card">
          <span class="fach-icon">{{ selectedSubject.icon }}</span>
          <h3>{{ selectedSubject.name }}</h3>
          <p>{{ selectedSubject.description }}</p>
        </div>
      </transition>
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

export default {
  data() {
    return {
      searchQuery: '', // Für die Suchleiste
      user: null,
      dropdownVisible: false,
      profileImage:
        'https://cdn.vectorstock.com/i/1000v/92/16/default-profile-picture-avatar-user-icon-vector-46389216.jpg',
      subjects: [
        {
          name: 'Mathematik',
          icon: '📐',
          description:
            'Mathematik fördert logisches Denken und Problemlösungsfähigkeiten, die in nahezu jedem Lebensbereich benötigt werden. Sie hilft dabei, analytisch zu denken und komplexe Probleme zu lösen. Mathematik ist die Grundlage vieler Wissenschaften und spielt eine wichtige Rolle in Technologie, Finanzen und Ingenieurwesen. Durch sie lernen wir, Strukturen und Muster in unserer Umgebung zu erkennen.',
        },
        {
          name: 'Deutsch',
          icon: '📚',
          description:
            'Deutsch verbessert deine Sprach- und Schreibfähigkeiten, die im Alltag und Berufsleben essenziell sind. Es schult die Ausdrucksfähigkeit und das Verständnis von Literatur sowie komplexen Texten. Darüber hinaus ist es eine Schlüsselkompetenz für Kommunikation und öffnet die Tür zu einer Vielzahl kultureller Werke. Deutsch zu beherrschen hilft, präzise und klar zu formulieren.',
        },
        {
          name: 'Englisch',
          icon: '🇬🇧',
          description:
            'Englisch ist die Weltsprache für internationale Kommunikation und wird in nahezu jedem Berufsfeld verwendet. Sie eröffnet den Zugang zu globalen Informationen und ermöglicht das Verständnis vieler kultureller und wissenschaftlicher Werke. Englisch ist auch ein wichtiger Schlüssel für Reisen und den Aufbau von internationalen Beziehungen. Die Sprache hilft dir, in einer globalisierten Welt zu bestehen.',
        },
        {
          name: 'Biologie',
          icon: '🌱',
          description:
            'Biologie erklärt die Natur und das Leben auf der Erde, von der kleinsten Zelle bis hin zu komplexen Ökosystemen. Sie hilft uns zu verstehen, wie lebende Organismen funktionieren und miteinander interagieren. Dieses Wissen fördert ein besseres Umweltbewusstsein und zeigt, wie wir die Natur nachhaltig schützen können. Biologie spielt auch eine zentrale Rolle in Medizin, Forschung und Gesundheit.',
        },
        {
          name: 'Physik',
          icon: '⚛️',
          description:
            'Physik erforscht die Grundlagen unserer Welt und erklärt, wie die Naturgesetze das Universum formen. Sie gibt uns Werkzeuge, um Phänomene wie Gravitation, Energie und Licht zu verstehen. Dieses Fach bildet die Basis für technische Innovationen und wissenschaftliche Entdeckungen. Physik lehrt uns, präzise zu denken und komplexe Konzepte systematisch zu analysieren.',
        },
        {
          name: 'Chemie',
          icon: '🧪',
          description:
            'Chemie untersucht die Zusammensetzung von Stoffen und ihre Wechselwirkungen. Sie zeigt, wie chemische Prozesse unser tägliches Leben beeinflussen, von der Nahrung, die wir essen, bis hin zu den Materialien, die wir verwenden. Dieses Fach ist entscheidend für Entwicklungen in Medizin, Umwelttechnik und Industrie. Chemie verbindet Theorie mit praktischen Experimenten, um das Unsichtbare sichtbar zu machen.',
        },
        {
          name: 'Geschichte',
          icon: '📜',
          description:
            'Geschichte verbindet uns mit der Vergangenheit und erklärt wichtige Ereignisse, die unsere Gegenwart geprägt haben. Sie hilft, aus früheren Fehlern zu lernen und die Entwicklung von Kulturen und Gesellschaften nachzuvollziehen. Dieses Fach fördert kritisches Denken und vermittelt ein besseres Verständnis für politische und soziale Strukturen. Geschichte zeigt, wie Vergangenheit, Gegenwart und Zukunft miteinander verbunden sind.',
        },
        {
          name: 'Geographie',
          icon: '🗺️',
          description:
            'Geographie erforscht die Welt und ihre verschiedenen Regionen, von physikalischen Landschaften bis hin zu kulturellen Aspekten. Sie zeigt, wie Natur und Mensch miteinander interagieren und wie globale Herausforderungen wie Klimawandel gelöst werden können. Dieses Fach fördert ein Verständnis für die Vielfalt unseres Planeten und die Notwendigkeit von Nachhaltigkeit. Geographie hilft uns, globale Zusammenhänge zu begreifen.',
        },
      ],

      selectedSubject: null,
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
    selectSubject(fach) {
      this.selectedSubject = fach;
    },
  },
};
</script>

<style scoped></style>
