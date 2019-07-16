<template>
  <div class="app">
    <AppHeader fixed>
      <SidebarToggler class="d-lg-none" display="md" mobile />
      <b-link class="navbar-brand" to="#">
        <img
          class="navbar-brand-full"
          height="40"
          alt="logo"
          src="../assets/kuzzle_vue.png"
        />
      </b-link>
      <SidebarToggler class="d-md-down-none" display="lg" />
      <b-navbar-nav class="ml-auto">
        <b-nav-item>
          <locale-changer />
        </b-nav-item>
        <div class="d-md-down-none username">{{ currentUsername }}</div>
        <b-nav-item class="d-md-down-none" @click="logout">
          <i class="fa fa-sign-out"></i>
        </b-nav-item>
      </b-navbar-nav>
    </AppHeader>
    <div class="app-body">
      <AppSidebar fixed>
        <SidebarHeader />
        <SidebarForm />
        <SidebarNav :navItems="navItems" />
        <SidebarFooter />
      </AppSidebar>
      <main class="main">
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </main>
    </div>
    <Footer>
      <div>
        <a href="https://kuzzle.io" target="_blank">Kuzzle</a>
      </div>
    </Footer>
  </div>
</template>

<script>
import LocaleChanger from '../components/LocaleChanger';
import {
  Header as AppHeader,
  SidebarToggler,
  Sidebar as AppSidebar,
  SidebarFooter,
  SidebarForm,
  SidebarHeader,
  SidebarNav,
  Footer
} from '@coreui/vue';
import { mapGetters } from 'vuex';

export default {
  name: 'DefaultContainer',
  components: {
    AppHeader,
    AppSidebar,
    LocaleChanger,
    SidebarForm,
    SidebarFooter,
    SidebarToggler,
    SidebarHeader,
    SidebarNav,
    Footer
  },
  computed: {
    navItems() {
      return [
        {
          name: this.$t('sidebar.home'),
          url: '/',
          icon: 'cui-dashboard'
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
  margin: 0 0 0 1em

.container-fluid
  margin-top: 2em

.nav-link
  text-align: left
</style>
