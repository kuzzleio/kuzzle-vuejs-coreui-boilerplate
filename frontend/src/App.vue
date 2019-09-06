<template>
  <div id="app">
    <router-view v-if="!$store.state.app.waitingForConnection" />
    <offline v-else />
    <b-toast
      id="offline-toast"
      :title="$t('offline.title')"
      no-auto-hide
      no-close-button
      variant="warning"
      toaster="b-toaster-bottom-right"
      append="true"
    >
      {{ $t('offline.message') }}
    </b-toast>
  </div>
</template>

<script>
import Offline from '@/views/Offline';

export default {
  name: 'App',
  components: {
    Offline
  },
  computed: {
    locale() {
      return this.$i18n.locale;
    },
    online() {
      return this.$store.state.app.online;
    }
  },
  methods: {
    checkConnection() {
      if (this.online === false) {
        this.$bvToast.show('offline-toast');
      } else {
        this.$bvToast.hide('offline-toast');
      }
    },
    async logout() {
      await this.$store.dispatch('auth/LOG_OUT', this.$kuzzle);
      this.$router.go('/');
    }
  },
  watch: {
    locale(newValue) {
      if (newValue) {
        localStorage.setItem('locale', this.locale);
      }
    },
    online: {
      immediate: false,
      handler() {
        this.checkConnection();
      }
    }
  },
  async mounted() {
    /**
     * APPLICATION BOOTSTRAP -- refactor this in a service if necessary.
     */
    this.$kuzzle.addListener('connected', () => {
      this.$store.commit('app/SET_ONLINE');
    });
    this.$kuzzle.addListener('reconnected', () => {
      this.$store.commit('app/SET_ONLINE');
    });
    this.$kuzzle.addListener('disconnected', () => {
      this.$store.commit('app/SET_OFFLINE');
    });
    this.$kuzzle.addListener('tokenExpired', () => {
      this.$store.dispatch('auth/LOG_OUT');
      this.$router.push({ name: 'login' });
    });
    const persistedLocale = localStorage.getItem('locale');
    if (persistedLocale) {
      this.$i18n.locale = persistedLocale;
    }
    await this.$kuzzle.connect();
    // Avoids showing the toast as soon as the app loads
    setTimeout(() => {
      this.checkConnection();
    }, 1000);
  }
};
</script>

<style lang="scss">
// CoreUI Icons Set
@import '~@coreui/icons/css/coreui-icons.min.css';
/* Import Font Awesome Icons Set */
$fa-font-path: '~font-awesome/fonts/';
@import '~font-awesome/scss/font-awesome.scss';
/* Import Simple Line Icons Set */
$simple-line-font-path: '~simple-line-icons/fonts/';
@import '~simple-line-icons/scss/simple-line-icons.scss';
/* Import Flag Icons Set */
@import '~flag-icon-css/css/flag-icon.min.css';
/* Import Bootstrap Vue Styles */
@import '~bootstrap-vue/dist/bootstrap-vue.css';
// Import Main styles for this application
@import 'assets/style';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
