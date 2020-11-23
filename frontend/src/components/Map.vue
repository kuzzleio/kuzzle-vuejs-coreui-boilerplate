<template>
  <div class="Map">
    <l-map ref="map">
      <l-tile-layer :url="url" :attribution="attribution" />
      <v-marker-cluster ref="myCluster">
        <!-- <l-marker
          v-for="(user, index) of onlineUsers"
          :key="user._id"
          :name="user._id"
          v-bind:lat-lng="GET_LAST_LOCATION_BY_USER_ID(user._id).coords"
          v-bind:options="{ id: user._id }"
          :icon="usersIcons[index]"
          :ref="user._id"
        > -->
        <!-- <Popup :user="user" /> -->
        <!-- </l-marker> -->
      </v-marker-cluster>
      <!-- <template v-if="displayZones">
        <l-circle
          v-for="locationRule of GET_LOCATION_RULES"
          :lat-lng="locationRule._source.location.coordinates"
          :key="locationRule._id"
          :radius="getRadiusInMeters(locationRule)"
          :color="getRuleColor(locationRule)"
          :ref="locationRule._id"
        >
          <l-tooltip :options="{ direction: 'top' }">{{
            locationRule._source.name
          }}</l-tooltip>
        </l-circle>
      </template>
      <l-control position="topright">
        <b-card>
          <b-form-checkbox
            v-model="displayZones"
            name="display-zone-switch"
            switch
          >
            <span class="switch-label">Show geofencing zones</span>
          </b-form-checkbox>
        </b-card>
      </l-control> -->
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
// import Popup from './Popup';

export default {
  name: 'Map',
  components: {
    // Popup,
    LMap,
    LTileLayer,
    // LMarker,
    // LCircle,
    // LTooltip,
    // LControl,
    'v-marker-cluster': Vue2LeafletMarkerCluster
  },
  data() {
    return {
      url: 'https://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initMap();
    });
  },
  methods: {
    initMap() {
      this.map = this.$refs.map.mapObject;
      setTimeout(() => {
        this.map.invalidateSize();
        this.map.setView(new L.LatLng(46.401804, 0.0392655), 6.4);
        this.$refs.myCluster.mapObject.on('spiderfied', cluster => {
          this.isClusterOpening = false;
          for (const marker of cluster.markers) {
            this.markersInClusterOpened.push(marker.options.id);
          }
        });
      }, 350);
    }
  }
};
</script>

<style lang="sass">
@import "~leaflet.markercluster/dist/MarkerCluster.css";
@import "~leaflet.markercluster/dist/MarkerCluster.Default.css";

.Map
  position: absolute
  width: 100%
  height: 100%
  z-index: 0
</style>
