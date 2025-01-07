<template>
  <div class="imprint-page">
    <!-- Header -->
    <header class="header">
      <nav class="navbar">
        <router-link to="/" class="navbar-brand">Nachhilfebörse</router-link>
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

    <div class="impressum-container">
      <h3 class="impressum-title">Erklärung zur Informationspflicht</h3>
      <p align="center"><strong>Datenschutzerklärung</strong></p>
      <p>
        In folgender Datenschutzerklärung informieren wir Sie über die wichtigsten Aspekte der
        Datenverarbeitung im Rahmen unserer Webseite. Wir erheben und verarbeiten personenbezogene
        Daten nur auf Grundlage der gesetzlichen Bestimmungen (Datenschutzgrundverordnung,
        Telekommunikationsgesetz 2003).
      </p>
      <p>
        Sobald Sie als Benutzer auf unsere Webseite zugreifen oder diese besuchen wird Ihre
        IP-Adresse, Beginn sowie Beginn und Ende der Sitzung erfasst. Dies ist technisch bedingt und
        stellt somit ein berechtigtes Interesse iSv Art 6 Abs 1 lit f DSGVO.
      </p>
      <h5 class="impressum-subtitle">Kontakt mit uns</h5>
      <p>
        Wenn Sie uns, entweder über unser Kontaktformular auf unserer Webseite, oder per Email
        kontaktieren, dann werden die von Ihnen an uns übermittelten Daten zwecks Bearbeitung Ihrer
        Anfrage oder für den Fall von weiteren Anschlussfragen für sechs Monate bei uns gespeichert.
        Es erfolgt, ohne Ihre Einwilligung, keine Weitergabe Ihrer übermittelten Daten.
      </p>
      <h5 class="impressum-subtitle">Server-Log Files</h5>
      <p>
        Diese Webseite und der damit verbundene Provider erhebt im Zuge der Webseitennutzung
        automatisch Informationen im Rahmen sogenannter „Server-Log Files“. Dies betrifft
        insbesondere:
      </p>
      <ul>
        <li>IP-Adresse oder Hostname</li>
        <li>den verwendeten Browser</li>
        <li>Aufenthaltsdauer auf der Webseite sowie Datum und Uhrzeit</li>
        <li>aufgerufene Seiten der Webseite</li>
        <li>Spracheinstellungen und Betriebssystem</li>
        <li>„Leaving-Page“ (auf welcher URL hat der Benutzer die Webseite verlassen)</li>
        <li>ISP (Internet Service Provider)</li>
      </ul>
      <p>
        Diese erhobenen Informationen werden nicht personenbezogen verarbeitet oder mit
        personenbezogenen Daten in Verbindung gebracht.
      </p>
      <p>
        Der Webseitenbetreiber behält es sich vor, im Falle von Bekanntwerden rechtswidriger
        Tätigkeiten, diese Daten auszuwerten oder zu überprüfen.
      </p>
      <h5 class="impressum-subtitle">Newsletter</h5>
      <p>
        Sie haben die Möglichkeit, über unsere Website unseren Newsletter zu abonnieren. Hierfür
        benötigen wir Ihre E-Mail-Adresse und ihre Erklärung, dass Sie mit dem Bezug des Newsletters
        einverstanden sind.
      </p>
      <h5 class="impressum-subtitle">Ihre Rechte als Betroffener</h5>
      <p>
        Sie als Betroffener haben bezüglich Ihrer Daten, welche bei uns gespeichert sind
        grundsätzlich ein Recht auf:
      </p>
      <ul>
        <li>Auskunft</li>
        <li>Löschung der Daten</li>
        <li>Berichtigung der Daten</li>
        <li>Übertragbarkeit der Daten</li>
        <li>Widerruf und Widerspruch zur Datenverarbeitung</li>
        <li>Einschränkung</li>
      </ul>
      <p>
        Wenn Sie vermuten, dass im Zuge der Verarbeitung Ihrer Daten Verstöße gegen das
        Datenschutzrecht passiert sind, so haben Sie die Möglichkeit, sich bei uns (<a
          href="mailto:edwards.i20@htlwienwest.at"
          class="impressum-link"
          >edwards.i20@htlwienwest.at</a
        >) oder der Datenschutzbehörde zu beschweren.
      </p>
      <h5 class="impressum-subtitle">Sie erreichen uns unter folgenden Kontaktdaten:</h5>
      <p>
        <b>Webseitenbetreiber:</b> Ibrahim Edwards<br />
        <b>Telefonnummer:</b> <a href="tel:+43149111113" class="impressum-link">+43149111113</a
        ><br />
        <b>Email:</b>
        <a href="mailto:edwards.i20@htlwienwest.at" class="impressum-link">
          edwards.i20@htlwienwest.at</a
        >
      </p>
      <p>
        Quelle:
        <b>
          <a
            href="https://www.fairesrecht.at/kostenlos-datenschutzerklaerung-erstellen-generator.php"
            target="_blank"
            class="impressum-link"
          >
            Datenschutzgenerator Österreich DSGVO
          </a>
        </b>
      </p>
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

<style scoped></style>
