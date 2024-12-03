<template>
  <div class="search-results">
    <h2>Suchergebnisse für "{{ $route.query.q }}"</h2>
    <div v-if="filteredTeachers.length > 0" class="results-list">
      <div v-for="teacher in filteredTeachers" :key="teacher.lehrerid" class="teacher-card">
        <img :src="teacher.profileImage || defaultImage" alt="Profilbild" class="profile-image" />
        <div class="teacher-info">
          <h3>{{ teacher.vorname }} {{ teacher.nachname }}</h3>
          <p>Erfahrung: {{ teacher.erfahrung || 'N/A' }} Jahre</p>
          <button @click="contactTeacher(teacher.email)">Kontaktieren</button>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Keine Ergebnisse gefunden.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SearchResults',
  data() {
    return {
      filteredTeachers: [], // Holds the search results
      defaultImage:
        'https://www.clipartmax.com/png/middle/33-335657_tutoring-clipart-tutor-icon-png.png',
    };
  },
  created() {
    this.performSearch();
  },
  methods: {
    async performSearch() {
      const query = this.$route.query.q;
      try {
        const response = await axios.get(`http://localhost:3000/api/lehrer/search?q=${query}`);
        this.filteredTeachers = response.data;
      } catch (error) {
        console.error('Fehler bei der Suche:', error);
      }
    },
    contactTeacher(email) {
      alert(`Kontakt zu ${email} aufnehmen.`);
    },
  },
};
</script>

<style scoped>
/* Styles for SearchResults.vue */
.search-results {
  background-color: #f1f1f1;
  color: #1d4069;
  padding: 40px 20px;
  text-align: center;
  min-height: 100vh;
}

.teacher-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #e3f2fd;
  color: #1d4069;
  border: 1px solid #1976d2;
  border-radius: 8px;
  padding: 20px;
  width: 250px;
  text-align: center;
}

.profile-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 10px;
}

.teacher-info h3 {
  font-size: 1.5em;
  margin: 10px 0 5px;
}
</style>
