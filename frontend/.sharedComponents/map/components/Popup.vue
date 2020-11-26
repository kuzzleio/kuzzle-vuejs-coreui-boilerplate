<template>
  <l-popup :options="popupOptions">
    <div class="text-left">
      <h3>
        Mr Anderson
      </h3>
      <b>Organization:</b><span class="bigger-font"> KUZZLE</span>
      <p class="mb-2 mt-2 ">
        <b>Mobile n°:</b>
        <span class="bigger-font">
          +355123456789
        </span>
      </p>
    </div>
  </l-popup>
</template>

<script>
import { ref } from '@vue/composition-api';
import { LPopup } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';

export default {
  name: 'Popup',
  components: {
    LPopup
  },
  setup() {
    return {
      popupOptions: ref({
        maxWidth: 300,
        minWidth: 300
      })
    };
  }
};
</script>
