<script lang="ts">
import { RouterLink, RouterView } from "vue-router";

export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      // if (this.currentUser && this.currentUser['roles']) {
      //   return this.currentUser['roles'].includes('ROLE_ADMIN');
      // }
      return true;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
};
</script>

<template>
<div>
  <header>
      <nav v-if="currentUser">
          <RouterLink to="/dashboard" class="nav-link">Dashboard</RouterLink>
          <RouterLink to="/recipes" class="nav-link">Recipes</RouterLink>
          <a class="nav-link" href="#" @click="logOut">Logout</a>
      </nav>

      <nav v-if="!currentUser">
          <RouterLink to="/login" class="nav-link">Login</RouterLink>
      </nav>
  </header>

  <RouterView />
</div>

</template>

<style>
</style>
