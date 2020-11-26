<template>
  <div class="Map">
    <l-map ref="map">
      <l-tile-layer :url="url" :attribution="attribution" />
      <slot name="marker"></slot>
      <slot name="content"></slot>
    </l-map>
  </div>
</template>

<script>
import L from 'leaflet';
import {
  LMap,
  LTileLayer,
  LMarker,
  LCircle,
  LTooltip,
  LControl
} from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
import Vue2LeafletMarkerCluster from 'vue2-leaflet-markercluster';

export default {
  name: 'Map',
  components: {
    LMap,
    LTileLayer
  },
  setup() {
    return {
      url: 'https://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
      )
    };
  }
};
</script>

<style lang="sass">
.Map
  position: absolute
  width: 100%
  height: 100%
  z-index: 0
</style>
