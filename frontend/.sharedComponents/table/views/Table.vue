<template>
  <Table
    :items="items"
    :fields="fields"
    :filterable="true"
    :selectable="true"
    @sort-changed="handleEvent"
    @row-selected="handleEvent"
    @filtered="handleEvent"
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
</template>

<script>
import { ref } from '@vue/composition-api';
import Table from '@/components/Table.vue';

export default {
  name: 'TableView',
  components: {
    Table
  },
  setup() {
    return {
      items: ref([
        {
          firstname: 'Agent',
          lastname: 'Smith',
          age: 42
        },
        {
          firstname: 'Choosen',
          lastname: 'One',
          age: 31
        }
      ]),
      fields: ref([
        {
          key: 'firstname',
          label: 'Firstname',
          sortable: true
        },
        {
          key: 'lastname',
          label: 'Lastname',
          sortable: true
        },
        {
          key: 'fullName',
          label: 'Full Name',
          sortable: true
        },
        {
          key: 'age',
          label: 'Age',
          sortable: false
        },
        {
          key: 'actions',
          label: 'Actions'
        }
      ]),
      removeRow: data => {
        console.log(data.item);
      },
      handleEvent: data => {
        console.log(data);
      }
    };
  }
};
</script>

<style lang="sass" scoped>
.pointer
  cursor: pointer
</style>
