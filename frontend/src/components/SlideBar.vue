<template>
  <div>
    <button type="button" class="btn btn-secondary" v-b-toggle.sidebar-1>
      <i class="fa fa-bars"></i>
      <span class="sr-only">Toggle Menu</span>
    </button>
    <b-sidebar
      id="sidebar-1"
      width="200"
      bg-variant="dark"
      text-variant="light"
      shadow
    >
      <h3>{{ $t('sidebar.menu') }}</h3>
      <b-nav class="m-3 flex-column">
        <b-nav-item
          class="text-left"
          v-for="(item, index) in navItems"
          :key="index"
          :href="item.url"
        >
          <i :class="item.icon + ' navbar-text-color'"></i>
          {{ item.name }}
        </b-nav-item>
      </b-nav>
    </b-sidebar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'SlideBar',
  components: {},
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
  }
};
</script>
