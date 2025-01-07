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
      <h4 class="impressum-title">Impressum</h4>
      <p>
        <b>
          Informationen und Offenlegung gemäß &sect;5 (1) ECG, &sect; 25 MedienG, &sect; 63 GewO und
          &sect; 14 UGB
        </b>
      </p>
      <p><b>Webseitenbetreiber:</b> Ibrahim Edwards</p>
      <p><b>Anschrift:</b> Thaliastraße 125, 1160 Wien</p>
      <p>
        <b>UID-Nr:</b> <br />
        <b>Gewerbeaufsichtbehörde:</b> <br />
        <b>Mitgliedschaften:</b>
      </p>
      <p>
        <b>Kontaktdaten:</b> <br />
        Telefon: <a href="tel:+43149111113" class="impressum-link">01 49111113</a><br />
        Email:
        <a href="mailto:edwards.i20@htlwienwest.at" class="impressum-link"
          >edwards.i20@htlwienwest.at</a
        >
      </p>
      <p>
        <b>Anwendbare Rechtsvorschrift:</b>
        <a href="https://www.ris.bka.gv.at" target="_blank" class="impressum-link">
          www.ris.bka.gv.at</a
        ><br />
        <b>Berufsbezeichnung:</b> Maturant/Security
      </p>
      <p>
        <b>Online Streitbeilegung:</b> Verbraucher, welche in Österreich oder in einem sonstigen
        Vertragsstaat der ODR-VO niedergelassen sind, haben die Möglichkeit Probleme bezüglich dem
        entgeltlichen Kauf von Waren oder Dienstleistungen im Rahmen einer Online-Streitbeilegung
        (nach OS, AStG) zu lösen. Die Europäische Kommission stellt eine Plattform hierfür bereit:
        <a href="https://ec.europa.eu/consumers/odr" target="_blank" class="impressum-link"
          >Online-Streitbeilegung</a
        >
      </p>
      <p>
        <b>Urheberrecht:</b> Die Inhalte dieser Webseite unterliegen, soweit dies rechtlich möglich
        ist, diversen Schutzrechten (z.B dem Urheberrecht). Jegliche Verwendung/Verbreitung von
        bereitgestelltem Material, welche urheberrechtlich untersagt ist, bedarf schriftlicher
        Zustimmung des Webseitenbetreibers.
      </p>
      <p>
        <b>Haftungsausschluss:</b> Trotz sorgfältiger inhaltlicher Kontrolle übernimmt der
        Webseitenbetreiber dieser Webseite keine Haftung für die Inhalte externer Links. Für den
        Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich. Sollten Sie
        dennoch auf ausgehende Links aufmerksam werden, welche auf eine Webseite mit rechtswidriger
        Tätigkeit/Information verweisen, ersuchen wir um dementsprechenden Hinweis, um diese nach §
        17 Abs. 2 ECG umgehend zu entfernen.<br />Die Urheberrechte Dritter werden vom Betreiber
        dieser Webseite mit größter Sorgfalt beachtet. Sollten Sie trotzdem auf eine
        Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei
        Bekanntwerden derartiger Rechtsverletzungen werden wir den betroffenen Inhalt umgehend
        entfernen.
      </p>
      <p>
        Quelle:
        <b>
          <a
            href="https://www.fairesrecht.at/kostenlos-impressum-erstellen-generator.php"
            target="_blank"
            class="impressum-link"
          >
            Impressum Generator Österreich
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
