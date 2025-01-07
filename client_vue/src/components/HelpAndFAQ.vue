<template>
  <div class="helpfaq-page">
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

    <!-- FAQ Section -->
    <section class="faq-section">
      <h1 class="section-title">Hilfe/FAQ</h1>
      <div class="faq-container">
        <div v-for="(faq, index) in faqs" :key="index" class="faq-item">
          <div class="faq-question" @click="toggleFaq(index)">
            <h2>{{ faq.question }}</h2>
            <svg
              :class="{ expanded: activeFaq === index }"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 16.5l-6-6h12z"
                :transform="activeFaq === index ? 'rotate(180, 12, 12)' : ''"
              />
            </svg>
          </div>
          <div class="faq-answer" :class="{ expanded: activeFaq === index }" ref="faqAnswer">
            <p>{{ faq.answer }}</p>
          </div>
        </div>
      </div>
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
      activeFaq: null,
      faqs: [
        {
          question: 'Wie buche ich eine Nachhilfestunde?',
          answer:
            'Um eine Nachhilfestunde zu buchen, registriere dich, wähle deinen Lehrer aus und buche einen verfügbaren Termin direkt auf der Plattform.',
        },
        {
          question: 'Wie kann ich meine Buchung stornieren?',
          answer:
            'Du kannst deine Buchung bis zu 24 Stunden vor der Nachhilfestunde in deinem Dashboard unter „Meine Buchungen“ stornieren.',
        },
        {
          question: 'Welche Zahlungsmethoden werden akzeptiert?',
          answer:
            'Wir akzeptieren Kreditkarten, PayPal und Sofortüberweisungen. Alle Transaktionen sind sicher und verschlüsselt.',
        },
        {
          question: 'Was passiert, wenn eine Nachhilfestunde abgesagt wird?',
          answer:
            'Falls eine Nachhilfestunde abgesagt wird, erhältst du eine Benachrichtigung und kannst kostenlos eine neue Stunde buchen.',
        },
      ],
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
    toggleFaq(index) {
      this.activeFaq = this.activeFaq === index ? null : index;
    },
  },
};
</script>

<style scoped></style>
