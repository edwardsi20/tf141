<template>
  <div class="admin-dashboard">
    <h2>Admin Dashboard</h2>

    <div class="user-section">
      <h3>Lehrer</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Aktionen</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="lehrer in lehrerListe"
            :key="lehrer.id"
            :class="{ zebra: lehrer.id % 2 === 0 }"
          >
            <td>{{ lehrer.id }}</td>
            <td>{{ lehrer.vorname }} {{ lehrer.nachname }}</td>
            <td>{{ lehrer.email }}</td>
            <td class="actions">
              <button class="edit" @click="bearbeiten(lehrer)">✏️</button>
              <button class="delete" @click="loeschen(lehrer.id)">🗑️</button>
              <button class="disable" @click="deaktivieren(lehrer.id)">🚫</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="user-section">
      <h3>Schüler</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Aktionen</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="schueler in schuelerListe"
            :key="schueler.id"
            :class="{ zebra: schueler.id % 2 === 0 }"
          >
            <td>{{ schueler.id }}</td>
            <td>{{ schueler.vorname }} {{ schueler.nachname }}</td>
            <td>{{ schueler.email }}</td>
            <td class="actions">
              <button class="edit" @click="bearbeiten(schueler)">✏️</button>
              <button class="delete" @click="loeschen(schueler.id)">🗑️</button>
              <button class="disable" @click="deaktivieren(schueler.id)">🚫</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
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
      const lehrerRes = await axios.get('http://localhost:3000/api/lehrer');
      const schuelerRes = await axios.get('http://localhost:3000/api/schueler');
      this.lehrerListe = lehrerRes.data;
      this.schuelerListe = schuelerRes.data;
    },
    bearbeiten(user) {
      alert(`Bearbeiten: ${user.vorname} ${user.nachname}`);
    },
    async loeschen(id) {
      if (confirm('Möchten Sie diesen Benutzer wirklich löschen?')) {
        await axios.delete(`http://localhost:3000/api/user/${id}`);
        await this.ladeBenutzer();
      }
    },
    async deaktivieren(id) {
      await axios.put(`http://localhost:3000/api/user/${id}/deaktivieren`);
      await this.ladeBenutzer();
    },
  },
};
</script>

<style scoped>
.admin-dashboard {
  max-width: 1000px;
  margin: auto;
  padding: 20px;
}

.user-section {
  margin-top: 20px;
}

h2,
h3 {
  text-align: center;
  color: #333;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

th,
td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #007bff;
  color: white;
}

tr.zebra {
  background-color: #f2f2f2;
}

.actions button {
  margin: 0 5px;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

.edit {
  background-color: #ffc107;
  color: white;
  border-radius: 5px;
}

.delete {
  background-color: #dc3545;
  color: white;
  border-radius: 5px;
}

.disable {
  background-color: #6c757d;
  color: white;
  border-radius: 5px;
}

button:hover {
  opacity: 0.8;
}
</style>
