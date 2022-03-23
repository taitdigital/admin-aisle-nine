<script lang="ts">
import { RouterLink, RouterView, useRouter } from "vue-router";
import { useStore } from 'vuex'
import Toast from 'primevue/toast';

export default {
  components: {
    Toast
  },
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

    const menuItems = [
                {
                   label:'Manage Categories and Ingredients',
                   icon:'pi pi-fw pi-file',
                   to: '/dashboard'
                },
                {
                   label:'Manage Recipes',
                   icon:'pi pi-fw pi-file',
                   to: '/recipes'
                }
            ]

    if (!store.state.auth.user) {
        router.push('/');
    }

    return { store, menuItems }
  }
};
</script>

<template>
<div>
  <Toast />

  <div>
    <Menubar :model="menuItems">
        <template #item="{item}">
            <router-link :to="item.to" custom v-slot="{href, route, navigate, isActive, isExactActive}">
                <a :href="href" @click="navigate" 
                class="p-button mr-2 nav-link"
                :class="{
                  'active-link p-button': isActive, 
                  'active-link-exact p-button': isExactActive,
                  'active-link p-button-outlined': !isActive, 
                  'active-link-exact p-button-outlined': !isExactActive
                  }" >{{item.label}}</a>
            </router-link>
        </template>

        <template #end>
          <nav v-if="!currentUser">
              <RouterLink to="/login" class="nav-link">Login</RouterLink>
          </nav>

          <nav v-if="currentUser">
              <a class="nav-link p-button p-button-outlined p-button-secondary" href="#" @click="logOut">Logout</a>
          </nav>           
      </template>
    </Menubar>
  </div>

  <RouterView />
</div>

</template>

<style>
  body {
    background: #e3e3e3;
  }

  .nav-link {
    text-decoration: none !important;
  }
</style>
