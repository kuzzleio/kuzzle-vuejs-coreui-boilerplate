<template>
  <div>
    <b-navbar type="dark" variant="dark">
      <b-link class="navbar-brand">
        <img class="navbar-brand-full" height="40" alt="logo" src="../assets/kuzzle_vue.png" />
      </b-link>
      <button type="button" class="btn btn-secondary" v-b-toggle.sidebar-1>
        <i class="fa fa-bars"></i>
        <span class="sr-only">Toggle Menu</span>
      </button>
      <b-navbar-nav class="ml-auto">
        <locale-changer />
      </b-navbar-nav>
      <div class="d-md-down-none username">{{ currentUsername }}</div>
      <b-navbar-nav class="d-md-down-none" data-cy="logout" name="logout" @click="logout">
        <i class="fas fa-sign-out-alt whiteiconcolor"></i>
      </b-navbar-nav>
    </b-navbar>

    <div>
      <div class="d-flex p-2">
        <b-sidebar id="sidebar-1" width="200px" bg-variant="dark" text-variant="light" shadow>
          <div class="px-3 text-left" v-for="(item, index) in navItems" :key="index">
            <i :class="item.icon"></i>
            <b-link class="nav-b-link" :href="item.url">
              {{
              item.name
              }}
            </b-link>
          </div>
        </b-sidebar>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import LocaleChanger from '../components/LocaleChanger';
import { mapGetters } from 'vuex';

export default {
  name: 'DefaultContainer',
  components: {
    LocaleChanger
  },
  computed: {
    navItems() {
      return [
        {
          name: this.$t('sidebar.home'),
          url: '/',
          icon: 'fas fa-home'
        },
        {
          name: this.$t('sidebar.home'),
          url: '/',
          icon: 'fas fa-home'
        }
      ];
    },
    ...mapGetters('auth', ['currentUsername'])
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/LOG_OUT', this.$kuzzle).then(() => {
        this.$router.push('/login');
      });
    }
  }
};
</script>

<style scoped lang="sass">
.username
  color: #73818f
  margin: 0 0.3em 0 1em

.nav-b-link
  margin: 5px
  color: #FFF
</style>
