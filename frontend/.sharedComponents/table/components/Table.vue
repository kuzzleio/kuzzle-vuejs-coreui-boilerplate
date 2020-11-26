<template>
  <div>
    <b-form-input
      v-if="filterable"
      v-model="filter"
      type="search"
      placeholder="Type to Filter"
    ></b-form-input>
    <b-table
      data-cy="table"
      striped
      hover
      bordered
      small
      no-sort-reset
      responsive="sm"
      :selectable="selectable"
      :filter="filter"
      :filter-include-fields="filterIncludedFields"
      :items="items"
      :fields="fields"
      @sort-changed="onSortChanged"
      @row-selected="onRowSelected"
      @filtered="onFiltered"
    >
      <template
        v-for="slotName in Object.keys($scopedSlots)"
        v-slot:[slotName]="slotScope"
      >
        <slot :name="slotName" v-bind="slotScope"></slot>
      </template>
    </b-table>
  </div>
</template>

<script>
import { ref, reactive } from '@vue/composition-api';

export default {
  name: 'Table',
  props: {
    items: {
      type: Array,
      required: true
    },
    fields: {
      type: Array,
      required: true
    },
    filterIncludedFields: {
      type: Array,
      required: false,
      default: () => []
    },
    filterable: {
      type: Boolean,
      required: false,
      default: false
    },
    selectable: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  setup(props, { emit }) {
    return {
      filter: ref(''),
      onSortChanged: data => {
        emit('sort-changed', data);
      },
      onRowSelected: data => {
        emit('row-selected', data);
      },
      onFiltered: data => {
        emit('filtered', data);
      }
    };
  }
};
</script>
