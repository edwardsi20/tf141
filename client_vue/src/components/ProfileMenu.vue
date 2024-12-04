<template>
  <div v-if="user" class="profile-menu">
    <img :src="profileImage" alt="Profilbild" class="profile-image" />
    <span class="profile-name">{{ user.vorname }} {{ user.nachname }}</span>
    <span class="profile-arrow" @click="toggleDropdown">🠻</span>
    <div v-if="dropdownVisible" class="dropdown">
      <button @click="logout">Ausloggen</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: null,
      dropdownVisible: false,
      profileImage:
        'https://cdn.vectorstock.com/i/1000v/92/16/default-profile-picture-avatar-user-icon-vector-46389216.jpg',
    };
  },
  created() {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    }
  },
  methods: {
    toggleDropdown() {
      this.dropdownVisible = !this.dropdownVisible;
    },
    logout() {
      localStorage.clear();
      this.user = null;
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
.profile-menu {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
}

.profile-image {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #1dace0;
}

.profile-name {
  font-weight: bold;
  color: #fff;
}

.profile-arrow {
  cursor: pointer;
}

.dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
