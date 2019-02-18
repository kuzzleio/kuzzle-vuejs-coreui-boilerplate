/*
 * Kuzzle, a backend software, self-hostable and ready to use
 * to power modern apps
 *
 * Copyright 2015-2018 Kuzzle
 * mailto: support AT kuzzle.io
 * website: http://kuzzle.io
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

function getProperty (document, path) {
  if (!document) {
    return document;
  }

  const names = path.split('.');

  if (names.length === 1) {
    return document[names[0]];
  }

  return getProperty(document[names[0]], names.slice(1).join('.'));
}

/**
 * @class PluginContext
 *
 * @paramPath {KuzzlePluginContext} context
 */
class PluginContext {
  /**
   * @param {KuzzlePluginContext} context
   * @param {object} config
   */
  constructor(context, config) {
    this.context = context;
    this.config = config;
  }

  /**
   * Throws a KuzzleError
   *
   * @param {string} errorType - Name of the error (eg: BadRequest for BadRequestError)
   * @param {?string} [message] - Additional message
   * @throws {KuzzleError}
   */
  throwError(errorType, message = null) {
    throw this.newError(errorType, message);
  }

  /**
   * Instantiates a new KuzzleError
   *
   * @param {string} errorType - Name of the error (eg: BadRequest for BadRequestError)
   * @param {?string} [message] - Additional message
   * @returns {KuzzleError}
   */
  newError(errorType, message = null) {
    const errorName = `${errorType}Error`;

    if (! this.context.errors[errorName]) {
      return this.newError(
        'PluginImplementation',
        `Bad errorType "${errorType}"`
      );
    }

    if (message) {
      return new this.context.errors[errorName](message);
    }

    return new this.context.errors[errorName]();
  }

  /**
   * Extracts a parameter from the request input
   *
   * @param {KuzzleRequest} request
   * @param {string} [paramPath] - Path of the parameter to extract (eg: 'foo' or 'foo.bar' for nested params)
   * @returns {any}
   */
  param (request, paramPath) {
    const
      args = request.input.args || {},
      body = request.input.body || {};

    return getProperty(args, paramPath) || getProperty(body, paramPath);
  }

  /**
   * Extracts a string parameter from the request input
   *
   * @param {KuzzleRequest} request
   * @param {string} paramPath - Path of the parameter to extract (eg: 'foo' or 'foo.bar' for nested params)
   * @param {?string} defaultValue
   * @returns {string}
   */
  stringParam(request, paramPath, defaultValue = null) {
    const stringParam = this.param(request, paramPath) || defaultValue;

    if (!stringParam) {
      this.throwError('BadRequest', `Missing param "${paramPath}"`);
    }

    if (typeof stringParam !== 'string') {
      this.throwError(
        'BadRequest',
        `Invalid string param "${paramPath}" value "${stringParam}"`
      );
    }

    return stringParam;
  }

  /**
   * Extracts a boolean parameter from the request input
   *
   * @param {KuzzleRequest} request
   * @param {string} paramPath - Path of the parameter to extract (eg: 'foo' or 'foo.bar' for nested params)
   * @param {?string} defaultValue
   * @returns {boolean}
   */
  booleanParam(request, paramPath, defaultValue = null) {
    const booleanParam = this.param(request, paramPath) || defaultValue;

    if (!booleanParam) {
      this.throwError('BadRequest', `Missing param "${paramPath}"`);
    }

    if (typeof booleanParam !== 'boolean') {
      this.throwError(
        'BadRequest',
        `Invalid boolean param "${paramPath}" value "${booleanParam}"`
      );
    }

    return booleanParam;
  }

  /**
   * Extracts a float parameter from the request input
   *
   * @param {KuzzleRequest} request
   * @param {string} paramPath - Path of the parameter to extract (eg: 'foo' or 'foo.bar' for nested params)
   * @param {?string} defaultValue
   * @returns {float}
   */
  floatParam(request, paramPath, defaultValue = null) {
    const floatParam = this.param(request, paramPath) || defaultValue;

    if (!floatParam) {
      this.throwError('BadRequest', `Missing param "${paramPath}"`);
    }

    const parsedFloat = parseFloat(floatParam);

    if (isNaN(parsedFloat)) {
      this.throwError(
        'BadRequest',
        `Invalid float param "${paramPath}" value "${floatParam}"`
      );
    }

    return floatParam;
  }

  /**
   * Extracts an integer parameter from the request input
   *
   * @param {KuzzleRequest} request
   * @param {string} paramPath - Path of the parameter to extract (eg: 'foo' or 'foo.bar' for nested params)
   * @param {?string} defaultValue
   * @returns {integer}
   */
  integerParam(request, paramPath, defaultValue = null) {
    const integerParam = this.param(request, paramPath) || defaultValue;

    if (!integerParam) {
      this.throwError('BadRequest', `Missing param "${paramPath}"`);
    }

    const parsedInteger = parseInt(integerParam);

    if (isNaN(parsedInteger)) {
      this.throwError(
        'BadRequest',
        `Invalid integer param "${paramPath}" value "${integerParam}"`
      );
    }

    return integerParam;
  }

  /**
   * Extracts an object parameter from the request input
   *
   * @param {KuzzleRequest} request
   * @param {string} paramPath - Path of the parameter to extract (eg: 'foo' or 'foo.bar' for nested params)
   * @param {?string} defaultValue
   * @returns {object}
   */
  objectParam(request, paramPath, defaultValue = null) {
    const objectParam = this.param(request, paramPath) || defaultValue;

    if (!objectParam) {
      this.throwError('BadRequest', `Missing param "${paramPath}"`);
    }

    if (typeof objectParam !== 'object') {
      this.throwError(
        'BadRequest',
        `Invalid object param "${paramPath}" value "${objectParam}"`
      );
    }

    return objectParam;
  }

  /**
   * Extracts an array parameter from the request input
   *
   * @param {KuzzleRequest} request
   * @param {string} paramPath - Path of the parameter to extract (eg: 'foo' or 'foo.bar' for nested params)
   * @param {?string[]} defaultValue
   * @returns {string[]}
   */
  arrayParam(request, paramPath, defaultValue = null) {
    const arrayParam = this.param(request, paramPath) || defaultValue;

    if (!arrayParam) {
      this.throwError('BadRequest', `Missing param "${paramPath}"`);
    }

    if (!Array.isArray(arrayParam)) {
      this.throwError(
        'BadRequest',
        `Invalid array param "${paramPath}" value "${arrayParam}"`
      );
    }

    return arrayParam;
  }

}

module.exports = PluginContext;
