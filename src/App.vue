<script lang="ts">
import { RouterLink, RouterView, useRouter } from "vue-router";
import { useStore } from 'vuex'

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
      this.$store.dispatch('auth/logout').then(() => {
        this.$router.push('/');
      });
    }
  },
  setup() {
    const store = useStore()
    const router = useRouter()

    if (!store.state.auth.user) {
        router.push('/');
    }
  }
};
</script>

<template>
<div>
  <header>
    <Menubar>
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
