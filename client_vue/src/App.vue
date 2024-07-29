<template>
  <div class="container mt-5">
    <h1>Lehrer Verwaltung</h1>
    <div class="mb-3">
      <input v-model="vorname" type="text" class="form-control" placeholder="Vorname" />
      <input v-model="nachname" type="text" class="form-control mt-2" placeholder="Nachname" />
      <button class="btn btn-primary mt-2" @click="addLehrer">Hinzufügen</button>
    </div>
    <button class="btn btn-secondary" @click="fetchLehrer">Lehrer abrufen</button>
    <ul class="mt-3">
      <li v-for="lehrer in lehrerList" :key="lehrer.id">
        {{ lehrer.vorname }} {{ lehrer.nachname }}
        <button class="btn btn-danger btn-sm ms-2" @click="deleteLehrer(lehrer.id)">Löschen</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';

const lehrerList = ref([]);
const vorname = ref('');
const nachname = ref('');

const fetchLehrer = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/lehrer');
    lehrerList.value = response.data;
  } catch (error) {
    console.error('Fehler beim Abrufen der Lehrer-Daten', error);
  }
};

const addLehrer = async () => {
  if (vorname.value.trim() && nachname.value.trim()) {
    try {
      const response = await axios.post('http://localhost:3000/api/lehrer', {
        vorname: vorname.value,
        nachname: nachname.value,
      });
      lehrerList.value.push(response.data);
      vorname.value = '';
      nachname.value = '';
    } catch (error) {
      console.error('Fehler beim Hinzufügen des Lehrers', error);
    }
  } else {
    alert('Bitte Vorname und Nachname eingeben');
  }
};

const deleteLehrer = async (id) => {
  try {
    await axios.delete(`http://localhost:3000/api/lehrer/${id}`);
    lehrerList.value = lehrerList.value.filter((lehrer) => lehrer.id !== id);
  } catch (error) {
    console.error('Fehler beim Löschen des Lehrers', error);
  }
};

export default {
  name: 'App',
  data() {
    return {
      lehrerList,
      vorname,
      nachname,
    };
  },
  methods: {
    fetchLehrer,
    addLehrer,
    deleteLehrer,
  },
};
</script>

<style scoped>
/* Füge hier dein CSS hinzu, falls benötigt */
</style>
