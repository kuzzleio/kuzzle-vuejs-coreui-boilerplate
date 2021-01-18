import _ from 'lodash';

export const typesCorrespondance = {
  boolean: 'checkbox',
  text: 'textArea',
  search_as_you_type: 'textArea',
  binary: 'input',
  integer: 'input',
  long: 'input',
  short: 'input',
  byte: 'input',
  double: 'input',
  float: 'input',
  half_float: 'input',
  scaled_float: 'input',
  keyword: 'input',
  wildcard: 'input',
  constant_keyword: 'input',
  ip: 'input',
  date: 'dateTimeFormInput',
  object: 'jsonFormInput',
  flattened: 'jsonFormInput',
  geo_point: 'jsonFormInput',
  geo_shape: 'jsonFormInput',
  histogram: 'jsonFormInput',
  percolator: 'jsonFormInput',
  point: 'jsonFormInput',
  integer_range: 'jsonFormInput',
  float_range: 'jsonFormInput',
  long_range: 'jsonFormInput',
  double_range: 'jsonFormInput',
  date_range: 'jsonFormInput',
  ip_range: 'jsonFormInput',
  rank_feature: 'jsonFormInput',
  rank_features: 'jsonFormInput',
  shape: 'jsonFormInput',
  sparse_vector: 'jsonFormInput',
  nested: 'jsonFormInput',
  join: 'jsonFormInput'
};

const inputTypesCorrespondance = {
  binary: 'text',
  ip: 'text',
  integer: 'number',
  long: 'number',
  short: 'number',
  byte: 'number',
  double: 'number',
  float: 'number',
  half_float: 'number',
  scaled_float: 'number',
  keyword: 'text',
  wildcard: 'text',
  constant_keyword: 'text'
};

interface JSONObject {
  [key: string]: any;
}

class FormSchemaService {
  public generate(mapping: Object, document: Object) {
    const schema: Schema = {
      fields: [],
      unavailable: []
    };

    const cleanedMapping = this.cleanMapping(mapping);

    for (const [index, value] of Object.entries(cleanedMapping)) {
      const documentField: object = (document as JSONObject)[index];
      const type: string = value['properties'] ? 'object' : value['type'];

      if (this.isUnavailable(documentField, type)) {
        schema.unavailable.push(index);
      }

      const typeCorrespondance = this.getTypeCorrespondance(type);

      const field: FormField = {
        type: typeCorrespondance,
        inputType: this.getInputTypeCorrespondance(type),
        label: index,
        model: index,
        mapping: value
      };

      schema.fields.push(field);
    }

    return schema;
  }

  private cleanMapping(mapping: object) {
    const fieldsToRemove = ['_kuzzle_info'];
    return _.omit(mapping, fieldsToRemove);
  }

  private isUnavailable(documentField: object, type: string) {
    if (!Object.keys(typesCorrespondance).includes(type)) {
      return true;
    }

    if (Array.isArray(documentField)) {
      return true;
    }

    return false;
  }

  private getTypeCorrespondance(mappingType: string) {
    return (typesCorrespondance as JSONObject)[mappingType];
  }

  private getInputTypeCorrespondance(mappingType: string) {
    return (inputTypesCorrespondance as JSONObject)[mappingType] || null;
  }
}

interface FormField {
  type: string;
  inputType: string;
  label: string;
  model: string;
  mapping: object;
}

interface Schema {
  fields: FormField[];
  unavailable: string[];
}

export const formSchemaService = new FormSchemaService();
