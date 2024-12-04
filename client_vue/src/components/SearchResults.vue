<template>
  <div class="search-results">
    <h2>Suchergebnisse für "{{ $route.query.search || 'Alle Lehrer' }}"</h2>
    <div v-if="filteredTeachers.length > 0" class="results-list">
      <div v-for="teacher in filteredTeachers" :key="teacher.lehrerid" class="teacher-card">
        <img :src="teacher.profileImage || defaultImage" alt="Profilbild" class="profile-image" />
        <div class="teacher-info">
          <h3>{{ teacher.vorname }} {{ teacher.nachname }}</h3>
          <p>Erfahrung: {{ teacher.erfahrung || 'N/A' }} Jahre</p>
          <button @click="contactTeacher(teacher.email)" class="btn-primary">Kontaktieren</button>
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
      filteredTeachers: [], // Filtered results
      defaultImage:
        'https://www.clipartmax.com/png/middle/33-335657_tutoring-clipart-tutor-icon-png.png',
    };
  },
  created() {
    this.performSearch();
  },
  methods: {
    async performSearch() {
      const query = this.$route.query.search?.toLowerCase() || '';
      try {
        const response = await axios.get(`http://localhost:3000/api/lehrer/search?q=${query}`);
        this.filteredTeachers = response.data;
      } catch (error) {
        console.error('Fehler bei der Suche:', error);
        this.filteredTeachers = []; // Reset on error
      }
    },
    contactTeacher(email) {
      alert(`Kontakt zu ${email} aufnehmen.`);
    },
  },
};
</script>

<style scoped>
.search-results {
  background-color: #f9f9f9;
  color: #1d4069;
  padding: 40px 20px;
  text-align: center;
  min-height: 100vh;
}

.search-results h2 {
  font-size: 2rem;
  margin-bottom: 20px;
}

.results-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.teacher-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  width: 300px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.profile-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 10px;
  border: 2px solid #1dace0;
}

.teacher-info h3 {
  font-size: 1.5rem;
  margin: 10px 0;
}

.teacher-info p {
  font-size: 1rem;
  color: #666;
}

.btn-primary {
  background-color: #1d4069;
  color: #fff;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}
</style>
