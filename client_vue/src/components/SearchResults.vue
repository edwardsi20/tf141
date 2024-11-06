<template>
  <div class="search-results">
    <h2>Suchergebnisse für "{{ $route.query.q }}"</h2>
    <div v-if="filteredTeachers.length > 0" class="results-list">
      <div v-for="teacher in filteredTeachers" :key="teacher.LehrerID" class="teacher-card">
        <img :src="teacher.profileImage || defaultImage" alt="Profilbild" class="profile-image" />
        <div class="teacher-info">
          <h3>{{ teacher.Vorname }} {{ teacher.Nachname }}</h3>
          <p>Fachrichtung: {{ teacher.subjects.join(', ') }}</p>
          <p>Erfahrung: {{ teacher.Erfahrung }} Jahre</p>
          <button @click="contactTeacher(teacher.Email)">Kontaktieren</button>
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
      teachers: [],
      defaultImage:
        'https://www.clipartmax.com/png/middle/33-335657_tutoring-clipart-tutor-icon-png.png',
    };
  },
  computed: {
    filteredTeachers() {
      const query = this.$route.query.q.toLowerCase();
      return this.teachers.filter((teacher) => {
        // Combine Vorname and Nachname and check if it contains the query
        const fullName = `${teacher.Vorname.toLowerCase()} ${teacher.Nachname.toLowerCase()}`;
        return fullName.includes(query);
      });
    },
  },
  created() {
    this.fetchTeachers();
  },
  methods: {
    async fetchTeachers() {
      try {
        const response = await axios.get('http://localhost:3000/api/lehrer');
        this.teachers = response.data.map((teacher) => ({
          ...teacher,
          subjects: ['Mathematik', 'Englisch'], // Example subjects, can be dynamic based on data
          profileImage: teacher.profileImage || this.defaultImage, // Placeholder image if none provided
        }));
      } catch (error) {
        console.error('Fehler beim Abrufen der Lehrer-Daten:', error);
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
  background-color: #f1f1f1;
  color: #1d4069;
  padding: 40px 20px;
  text-align: center;
  min-height: 100vh;
}

.search-results h2 {
  font-size: 2em;
  margin-bottom: 20px;
  color: #1d4069;
}

.results-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
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

.teacher-info p {
  font-size: 1em;
  margin: 5px 0;
}

.teacher-card button {
  padding: 8px 16px;
  background-color: #1976d2;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
  margin-top: 10px;
}

.teacher-card button:hover {
  background-color: #0d47a1;
}
</style>
