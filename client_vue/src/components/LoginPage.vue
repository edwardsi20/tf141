<template>
  <div class="login-page">
    <header class="header">
      <nav class="navbar">
        <router-link to="/" class="navbar-brand">Nachhilfebörse</router-link>
        <ul class="navbar-links">
          <li><router-link to="/subjects">Schulfächer</router-link></li>
          <li><router-link to="/how-it-works">So geht's</router-link></li>
          <li><router-link to="/info">Infos</router-link></li>
          <li><router-link to="/pricing">Preise</router-link></li>
          <li><router-link to="/login" class="btn-login">Login</router-link></li>
        </ul>
      </nav>
      <h1>Login</h1>
    </header>
    <section class="login-form">
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">E-Mail</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div class="form-group">
          <label for="password">Passwort</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit" class="btn-primary">Einloggen</button>
      </form>
      <p class="register-link">
        Noch kein Konto? <router-link to="/register">Registrieren</router-link>
      </p>
    </section>
  </div>

  <footer class="footer">
    <p>© 2023 Nachhilfebörse</p>
    <ul class="footer-links">
      <li><router-link to="/impressum">Impressum</router-link></li>
      <li><router-link to="/privacy">Datenschutz</router-link></li>
      <li><router-link to="/contact">Kontakt</router-link></li>
    </ul>
  </footer>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await axios.post('http://localhost:3000/api/login', {
          email: this.email,
          password: this.password,
        });

        const user = response.data.user;
        const role = response.data.role;

        // Benutzerinformationen im lokalen Speicher speichern
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('role', role);

        // Weiterleitung zur Startseite
        this.$router.push('/');
      } catch (error) {
        alert('Login fehlgeschlagen: Ungültige E-Mail oder Passwort');
      }
    },
  },
};
</script>

<style scoped>
/* General Styling */
.login-page {
  font-family: Arial, sans-serif;
  color: #333;
  margin: 0;
  padding: 0;
  text-align: center;
}

/* Header */
.header h1 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  padding: 2rem 1rem;
  background-color: #1dace0;
  color: #fff;
}

/* Navbar */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #1d4069;
  color: #fff;
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
  text-decoration: none;
}

.navbar-links {
  list-style: none;
  display: flex;
  gap: 1rem;
  margin: 0;
}

.navbar-links li a {
  color: #fff;
  text-decoration: none;
  font-weight: bold;
}

.btn-login {
  background-color: #1dace0;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  color: #fff;
}

/* Form Section */
.login-form {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1.5rem;
  text-align: left;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.form-group input {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.btn-primary {
  display: block;
  width: 100%;
  padding: 0.8rem;
  background-color: #1d4069;
  color: #fff;
  text-decoration: none;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
}

.register-link {
  margin-top: 1rem;
  font-size: 0.9rem;
}

.footer {
  text-align: center;
  padding: 2rem;
  background-color: #333;
  color: #fff;
}
.footer-links {
  list-style: none;
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 1rem 0 0;
  padding: 0;
}
.footer-links li a {
  color: #1dace0;
  text-decoration: none;
}
</style>
