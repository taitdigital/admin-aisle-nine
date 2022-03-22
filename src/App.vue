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
    <Menubar>
        <template #start>
            Aisle 9 Admin
        </template>

        <template>
            <nav v-if="currentUser">
                <RouterLink to="/dashboard" class="nav-link">Dashboard</RouterLink>
                <RouterLink to="/recipes" class="nav-link">Recipes</RouterLink>
            </nav>
        </template>

        <template #end>
          <nav v-if="!currentUser">
              <RouterLink to="/login" class="nav-link">Login</RouterLink>
          </nav>

          <nav v-if="currentUser">
              <a class="nav-link" href="#" @click="logOut">Logout</a>
          </nav>           
      </template>
    </Menubar>





  </header>

  <RouterView />
</div>

</template>

<style>
  body {
    background: #e3e3e3;
  }
</style>
