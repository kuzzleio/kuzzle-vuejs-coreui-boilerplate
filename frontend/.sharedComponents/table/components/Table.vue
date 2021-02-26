<template>
  <b-container>
    <b-row class="mb-1">
      <b-col cols="9">
        <b-form-input
          v-if="filterable"
          v-model="filter"
          type="search"
          placeholder="Type to Filter"
          @input="onFiltered"
        ></b-form-input>
      </b-col>
      <b-col cols="3">
        <b-input-group prepend="Per page">
          <b-form-select
            v-model="_perPage"
            id="perPageSelect"
            :options="pageOptions"
            @change="onPerPageChanged"
          ></b-form-select>
        </b-input-group>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="12">
        <b-container class="overflow-auto p-0 m-0">
          <b-table
            class="m-0 p-0"
            data-cy="table"
            v-bind="mergedOptions"
            :selectable="selectable"
            :items="items"
            :fields="fields"
            :no-local-sorting="true"
            @sort-changed="onSortChanged"
            @row-selected="onRowSelected"
          >
            <template
              v-for="slotName of Object.keys($scopedSlots)"
              v-slot:[slotName]="slotScope"
            >
              <slot :name="slotName" v-bind="slotScope"></slot>
            </template>
          </b-table>
        </b-container>
        <b-pagination
          v-model="_currentPage"
          :total-rows="totalRows"
          align="fill"
          size="sm"
          class="mt-2 d-flex pull-right"
          :per-page="_perPage"
        ></b-pagination>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { ref, watch, reactive, computed } from '@vue/composition-api';

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
    filterable: {
      type: Boolean,
      required: false,
      default: false
    },
    selectable: {
      type: Boolean,
      required: false,
      default: false
    },
    currentPage: {
      type: Number,
      required: false,
      default: 1
    },
    perPage: {
      type: Number,
      required: false,
      default: 10
    },
    pageOptions: {
      type: Array,
      required: false,
      default: () => [1, 10, 15, 100]
    },
    totalRows: {
      type: Number,
      required: false,
      default: 0
    },
    tableOptions: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
  setup(props, { emit }) {
    let _currentPage = ref(props.currentPage);
    let _perPage = ref(props.perPage);

    const defaultTableOptions = {
      striped: true,
      hover: true,
      bordered: true,
      small: true,
      responsive: 'sm',
      'no-sort-reset': true,
      'show-empty': true
    };

    watch(_currentPage, value => {
      emit('page-changed', value);
    });

    const mergedOptions = computed(() => {
      return { ...props.tableOptions, ...defaultTableOptions };
    });

    return {
      filter: ref(''),
      _currentPage,
      _perPage: reactive(props.perPage),
      mergedOptions,
      onSortChanged: data => {
        emit('sort-changed', data);
      },
      onRowSelected: data => {
        emit('row-selected', data);
      },
      onFiltered: filter => {
        emit('filtered', filter);
      },
      onPerPageChanged: data => {
        emit('per-page-changed', data);
      }
    };
  }
};
</script>
