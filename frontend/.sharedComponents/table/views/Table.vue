<template>
  <b-container class="mu-2">
    <b-row>
      <b-col cols="8">
        <Table
          :items="items"
          :fields="fields"
          :filterable="true"
          :selectable="true"
          :current-page="currentPage"
          :per-page="perPage"
          :total-rows="totalRows"
          @sort-changed="onSortChanged"
          @row-selected="handleEvent"
          @filtered="onFilterChanged"
          @page-changed="onPageChanged"
          @per-page-changed="onPerPageChanged"
        >
          <template v-slot:cell(fullName)="data">
            {{ data.item.firstname }} {{ data.item.lastname }}
          </template>

          <template v-slot:cell(actions)="data">
            <a href="#" @click.prevent="removeRow(data)" class="text-danger">
              <i class="pointer fa fa-trash trash" />
            </a>
          </template>
        </Table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { ref, reactive, watch } from '@vue/composition-api';
import Table from '@/components/Table.vue';

import MappingFieldsService from '@/services/MappingFieldsService';

export default {
  name: 'TableView',
  components: {
    Table
  },
  setup(props, ctx) {
    const mappingFieldsService = new MappingFieldsService();
    const items = reactive([]);
    let totalRows = ref(0);
    let currentPage = 1;
    let perPage = ref(1);
    let filter = ref('');
    let sort = ref(null);

    const fetchItems = () => {
      let query = {};
      if (filter.value.length) {
        query = {
          query: {
            multi_match: {
              query: filter.value,
              type: 'phrase_prefix',
              fields: ['*']
            }
          }
        };
      }
      if (sort.value) {
        query.sort = sort.value;
      }

      ctx.root.$kuzzle.document
        .search('cypress', 'e2e', query, {
          from: (currentPage - 1) * perPage.value,
          size: perPage.value
        })
        .then(res => {
          items.splice(items, items.length);
          for (const doc of res.hits) {
            items.push(doc._source);
          }
          totalRows.value = res.total;
        });
    };

    fetchItems();

    let fields = ref([]);
    ctx.root.$kuzzle.collection
      .getMapping('cypress', 'e2e', {
        includeKuzzleMeta: false
      })
      .then(res => {
        fields.value = mappingFieldsService.getFieldsForTable(res);
      });

    return {
      items,
      currentPage,
      perPage,
      totalRows,
      fields: fields,
      removeRow: data => {
        console.log(data.item);
      },
      handleEvent: data => {
        console.log(data);
      },
      onPageChanged: page => {
        currentPage = page;
        fetchItems();
      },
      onPerPageChanged: value => {
        perPage.value = value;
        currentPage = 1;
        fetchItems();
      },
      onFilterChanged: receivedFilter => {
        filter.value = receivedFilter;
        fetchItems();
      },
      onSortChanged: data => {
        sort.value = [
          {
            [data.sortBy]: {
              order: data.sortDesc ? 'desc' : 'asc'
            }
          }
        ];
        fetchItems();
      }
    };
  }
};
</script>

<style lang="sass" scoped>
.pointer
  cursor: pointer
</style>
