<template>
  <div class="locale-changer">
    <b-select id="locale-selector" v-model="$i18n.locale">
      <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="i">{{
        lang
      }}</option>
    </b-select>
  </div>
</template>

<script>
import { i18n } from '@/config.json';

export default {
  name: 'locale-changer',
  data() {
    /**
     * Add languages in the config file to configure the locale changer
     */
    return { langs: i18n.locales };
  }
};
</script>
