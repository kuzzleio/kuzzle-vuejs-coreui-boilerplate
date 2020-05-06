<template>
  <div>
    <b-navbar type="dark" variant="dark">
      <b-link class="navbar-brand">
        <img
          class="navbar-brand-full"
          height="40"
          alt="logo"
          src="../assets/kuzzle_vue.png"
        />
      </b-link>
      <button type="button" class="btn btn-secondary" v-b-toggle.sidebar>
        <i class="fa fa-bars"></i>
        <span class="sr-only">Toggle Menu</span>
      </button>
      <b-navbar-nav class="ml-auto">
        <locale-changer />
      </b-navbar-nav>
      <div class="d-md-down-none navbar-text-color">{{ currentUsername }}</div>
      <b-navbar-nav
        class="d-md-down-none"
        data-cy="logout"
        name="logout"
        @click="logout"
      >
        <i class="fas fa-sign-out-alt navbar-text-color"></i>
      </b-navbar-nav>
    </b-navbar>
    <SideBar />
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import LocaleChanger from '../components/LocaleChanger';
import SideBar from '../components/SideBar';

export default {
  name: 'DefaultContainer',
  components: {
    LocaleChanger,
    SideBar
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
