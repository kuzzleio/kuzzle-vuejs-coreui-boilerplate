<template>
  <b-row>
    <b-col cols="12">
      <!-- Admin view -->
      <b-col
        cols="12"
        v-if="currentUser && currentUser.profileIds.includes('admin')"
      >
        <DeviceManagerCard
          title="Sensors"
          controller="device-manager/sensor"
          collection="sensors"
          add-item-label="Add a sensor"
          :is-admin="true"
          :include-global-index="true"
        ></DeviceManagerCard>

        <DeviceManagerCard
          title="Assets"
          controller="device-manager/asset"
          collection="assets"
          add-item-label="Add an asset"
          :is-admin="true"
        ></DeviceManagerCard>
      </b-col>

      <!-- User view -->
      <b-col cols="12" v-else>
        <DeviceManagerCard
          title="Sensors"
          controller="device-manager/sensor"
          collection="sensors"
          add-item-label="Add a sensor"
        ></DeviceManagerCard>

        <DeviceManagerCard
          title="Assets"
          controller="device-manager/asset"
          collection="assets"
          add-item-label="Add an asset"
        ></DeviceManagerCard>
      </b-col>
    </b-col>
  </b-row>
</template>

<script>
// import TableView from '@/components/TableView';
import DeviceManagerCard from '@/components/DeviceManagerCard';
import { mapGetters, state } from 'vuex';
import { ref } from '@vue/composition-api';

export default {
  components: {
    // TableView,
    DeviceManagerCard
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.currentUser;
    }
  },
  setup(props, ctx) {
    let tenants = ref([]);
    let assetTenantSelected = ref(null);
    let sensorTenantSelected = ref(null);

    const res = ctx.root.$kuzzle
      .query({
        controller: 'device-manager/engine',
        action: 'list'
      })
      .then(res => {
        tenants.value = res.result.engines;
        if (res.result.engines.length > 0) {
          assetTenantSelected.value = res.result.engines[0].index;
          sensorTenantSelected.value = res.result.engines[0].index;
        }
      });

    return {
      tenants,
      assetTenantSelected,
      sensorTenantSelected
    };
  }
};
</script>

<style></style>
