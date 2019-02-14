<template>
  <div class="locale-changer">
    <b-select id="locale-selector" v-model="$i18n.locale">
      <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="i">{{ lang }}</option>
    </b-select>
  </div>
</template>

<script>
export default {
  name: 'locale-changer',
  data() {
    return { langs: { en: 'English', fr: 'Français' } };
  }
};
</script>