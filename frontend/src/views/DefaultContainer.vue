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
      <SlideBar />
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
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import LocaleChanger from '../components/LocaleChanger';
import SlideBar from '../components/SlideBar';

export default {
  name: 'DefaultContainer',
  components: {
    LocaleChanger,
    SlideBar
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

<style scoped lang="scss">
.nav-b-link {
  margin: 5px;
}
</style>
