<template>
  <div class="container mt-5">
    <h1>Lehrer Verwaltung</h1>
    <div class="mb-3">
      <input v-model="vorname" type="text" class="form-control" placeholder="Vorname" />
      <input v-model="nachname" type="text" class="form-control mt-2" placeholder="Nachname" />
      <input
        v-model="geburtsdatum"
        type="date"
        class="form-control mt-2"
        placeholder="Geburtsdatum"
      />
      <select v-model="geschlecht" class="form-control mt-2">
        <option value="männlich">Männlich</option>
        <option value="weiblich">Weiblich</option>
      </select>
      <input v-model="email" type="email" class="form-control mt-2" placeholder="Email" />
      <input v-model="passwort" type="password" class="form-control mt-2" placeholder="Passwort" />
      <button class="btn btn-primary mt-2" @click="addLehrer">Hinzufügen</button>
    </div>
    <button class="btn btn-secondary" @click="fetchLehrer">Lehrer abrufen</button>
    <ul class="mt-3">
      <li v-for="lehrer in lehrerList" :key="lehrer.lehrerid">
        {{ lehrer.vorname }} {{ lehrer.nachname }} - {{ lehrer.email }}
        <button class="btn btn-danger btn-sm ms-2" @click="deleteLehrer(lehrer.lehrerid)">
          Löschen
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';

export default {
  name: 'App',
  setup() {
    const lehrerList = ref([]);
    const vorname = ref('');
    const nachname = ref('');
    const geburtsdatum = ref('');
    const geschlecht = ref('männlich');
    const email = ref('');
    const passwort = ref('');

    const fetchLehrer = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/lehrer');
        lehrerList.value = response.data;
      } catch (error) {
        console.error('Fehler beim Abrufen der Lehrer-Daten', error);
      }
    };

    const addLehrer = async () => {
      if (
        vorname.value &&
        nachname.value &&
        geburtsdatum.value &&
        geschlecht.value &&
        email.value &&
        passwort.value
      ) {
        try {
          const response = await axios.post('http://localhost:3000/api/lehrer', {
            vorname: vorname.value,
            nachname: nachname.value,
            geburtsdatum: geburtsdatum.value,
            geschlecht: geschlecht.value,
            email: email.value,
            passwort: passwort.value,
          });
          lehrerList.value.push(response.data);
          vorname.value = '';
          nachname.value = '';
          geburtsdatum.value = '';
          geschlecht.value = 'männlich';
          email.value = '';
          passwort.value = '';
        } catch (error) {
          console.error('Fehler beim Hinzufügen des Lehrers', error);
        }
      } else {
        alert('Bitte alle Felder ausfüllen');
      }
    };

    const deleteLehrer = async (id) => {
      try {
        await axios.delete(`http://localhost:3000/api/lehrer/${id}`);
        lehrerList.value = lehrerList.value.filter((lehrer) => lehrer.lehrerid !== id);
      } catch (error) {
        console.error('Fehler beim Löschen des Lehrers', error);
      }
    };

    return {
      lehrerList,
      vorname,
      nachname,
      geburtsdatum,
      geschlecht,
      email,
      passwort,
      fetchLehrer,
      addLehrer,
      deleteLehrer,
    };
  },
};
</script>

<style scoped>
/* Füge hier dein CSS hinzu, falls benötigt */
</style>
