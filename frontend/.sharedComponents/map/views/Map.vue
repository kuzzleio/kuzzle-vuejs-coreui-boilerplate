<template>
  <Map>
    <template v-slot:marker>
      <v-marker-cluster ref="myCluster">
        <l-marker
          v-for="marker of markers"
          :key="marker.id"
          :name="marker.name"
          v-bind:lat-lng="marker.location"
          v-bind:options="{ id: marker.id }"
          :icon="marker.icon"
          :ref="marker.id"
        >
          <Popup />
        </l-marker>
      </v-marker-cluster>
    </template>
  </Map>
</template>

<script>
import { ref } from '@vue/composition-api';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';
import Map from '@/components/Map.vue';
import Popup from '@/components/Popup.vue';
import { LMarker } from 'vue2-leaflet';
import Vue2LeafletMarkerCluster from 'vue2-leaflet-markercluster';

export default {
  name: 'MapView',
  components: {
    Map,
    LMarker,
    Popup,
    'v-marker-cluster': Vue2LeafletMarkerCluster
  },
  setup() {
    const markers = ref([
      {
        id: 42,
        name: 'Test',
        location: {
          lat: 1,
          lng: 1
        },
        icon: new L.divIcon({
          html: '<i class="fa fa-map-marker fa-3x" style="color:red"></i>',
          className: 'heartIcon',
          shadowUrl,
          iconSize: [20, 36],
          iconAnchor: [10, 36],
          popupAnchor: [1, -34],
          interactive: true
        })
      }
    ]);

    return {
      markers
    };
  }
};
</script>

<style lang="sass">
@import "~leaflet.markercluster/dist/MarkerCluster.css";
@import "~leaflet.markercluster/dist/MarkerCluster.Default.css";
</style>