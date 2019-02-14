<template>
  <b-form @submit.prevent="login">
    <h1>{{ $t('login.title') }}</h1>
    <p class="text-muted">{{ $t('login.subtitle') }}</p>
    <b-input-group class="mb-3">
      <b-input-group-prepend>
        <b-input-group-text>
          <i class="icon-user"></i>
        </b-input-group-text>
      </b-input-group-prepend>
      <b-form-input
        v-model="username"
        type="text"
        class="form-control"
        :placeholder="$t('login.usernamePlaceholder')"
        autocomplete="username email"
      />
    </b-input-group>
    <b-input-group class="mb-4">
      <b-input-group-prepend>
        <b-input-group-text>
          <i class="icon-lock"></i>
        </b-input-group-text>
      </b-input-group-prepend>
      <b-form-input
        v-model="password"
        type="password"
        class="form-control"
        :placeholder="$t('login.passwordPlaceholder')"
        autocomplete="current-password"
      />
    </b-input-group>
    <b-row>
      <b-col cols="6">
        <b-button variant="primary" class="px-4" type="submit">{{ $t('login.submitLabel') }}</b-button>
      </b-col>
      <b-col cols="6">
        <b-form-group
          horizontal
          :label-cols="4"
          :label="$t('common.language')"
          label-for="locale-selector"
        >
          <locale-changer/>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <div v-if="this.errorMessage" class="alert alert-danger" role="alert">{{ translatedError }}</div>
      </b-col>
    </b-row>
  </b-form>
</template>

<script>
import kuzzle from '@/services/kuzzle';
import LocaleChanger from '@/components/LocaleChanger';

export default {
  name: 'LoginForm',
  components: {
    LocaleChanger
  },
  data() {
    return {
      username: '',
      password: '',
      errorMessage: ''
    };
  },
  mounted() {},
  methods: {
    async login() {
      const credentials = { username: this.username, password: this.password };
      this.setErrorMessage('');

      this.$store
        .dispatch('auth/LOGIN', credentials)
        .then(() => {
          if (this.$route.query.to) {
            this.$router.push({ name: this.$route.query.to });
            return;
          }
          this.$router.push('/');
        })
        .catch(error => {
          this.setErrorMessage(error.message);
        });
    },
    setErrorMessage(errorMessage) {
      this.errorMessage = errorMessage;
    }
  },
  computed: {
    translatedError() {
      if (this.errorMessage.match(/wrong.*username.*password/)) {
        return this.$t('login.errors.badCredentials');
      }
      if (this.errorMessage.match(/Missing.*credentials/)) {
        return this.$t('login.errors.missingCredentials');
      }
      if (this.errorMessage.match(/.*not connected to.*/)) {
        return this.$t('login.errors.notConnected');
      }
      console.error(this.errorMessage);
      return this.$t('login.errors.generic');
    }
  }
};
</script>

<style scoped lang="sass">
.alert
  margin-top: 2em
</style>
