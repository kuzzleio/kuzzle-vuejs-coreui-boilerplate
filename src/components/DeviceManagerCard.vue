<template>
  <b-card
    align="center"
    class="mt-2"
    border-variant="secondary"
    header="Secondary"
    header-bg-variant="secondary"
    header-text-variant="white"
  >
    <template #header>
      <b-row>
        <b-col cols="10">
          <h3>{{ title }}</h3>
        </b-col>
        <b-col cols="2">
          <b-form-select
            v-if="tenants && tenants.length > 0"
            v-model="tenantSelected"
            class="pull-right"
          >
            <b-form-select-option
              v-for="tenant of tenants"
              :key="tenant.index"
              :value="tenant.index"
              >{{ tenant.index }}</b-form-select-option
            >
          </b-form-select>
        </b-col>
      </b-row>
    </template>
    <b-row>
      <b-col cols="12">
        <TableView
          v-if="tenantSelected"
          :title="`${title} - ${tenantSelected}`"
          :index="tenantSelected"
          :controller="controller"
          :collection="collection"
          :add-item-label="addItemLabel"
        >
        </TableView>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import TableView from '@/components/TableView';
import { ref } from '@vue/composition-api';

export default {
  components: {
    TableView
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.currentUser;
    }
  },
  props: {
    title: {
      type: String,
      required: true
    },
    controller: {
      type: String,
      required: true
    },
    collection: {
      type: String,
      required: true
    },
    addItemLabel: {
      type: String,
      required: false
    },
    isAdmin: {
      type: Boolean,
      required: false,
      default: false
    },
    includeGlobalIndex: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  setup(props, ctx) {
    let tenants = ref([]);
    let tenantSelected = ref(null);

    if (props.isAdmin) {
      if (props.includeGlobalIndex) {
        tenants.value.push({
          index: 'device-manager'
        });
      }
      const res = ctx.root.$kuzzle
        .query({
          controller: 'device-manager/engine',
          action: 'list'
        })
        .then(res => {
          if (res.result.engines.length > 0) {
            tenants.value.push(...res.result.engines);
            tenantSelected.value = tenants.value[0].index;
          }
        });
    } else {
      tenants.value = ctx.root.$store.state.auth.currentUser.tenants;
      if (ctx.root.$store.state.auth.currentUser.tenants) {
        tenantSelected.value =
          ctx.root.$store.state.auth.currentUser.tenants[0].index;
      }
    }

    return {
      tenants,
      tenantSelected
    };
  }
};
</script>
