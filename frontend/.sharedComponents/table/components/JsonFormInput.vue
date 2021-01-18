<template>
  <b-card class="w-100">
    <b-card-body class="m-0 p-0">
      <!-- <b-row>
        <b-col lg="8"> -->
      <json-editor
        class="h-100"
        :content="JSON.stringify(value, null, 2) || '{}'"
        @change="onChange"
      />
      <!-- </b-col>
      </b-row> -->
    </b-card-body>
  </b-card>
</template>

<script>
// https://vue-generators.gitbook.io/vue-generators/fields/custom_fields
import { abstractField } from 'vue-form-generator';
import JsonEditor from './JsonEditor';

export default {
  components: {
    JsonEditor
  },
  mixins: [abstractField],
  methods: {
    onChange(jsonString) {
      try {
        this.value = JSON.parse(jsonString);
      } catch (err) {
        // do nothing...
        // if the JSON is invalid, no need to trigger form change event
        return;
      }
    }
  }
};
</script>
