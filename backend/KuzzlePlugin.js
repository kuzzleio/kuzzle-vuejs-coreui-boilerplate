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

const
  _ = require('lodash'),
  AwesomeService = require('./lib/services/AwesomeService'),
  buildControllers = require('./lib/controllers');

/**
 * @class KuzzlePlugin
 *
 * @property {KuzzlePluginContext} context
 * @property {ControllerImplementations} controllersInstances
 * @property {Controllers} controllers
 * @property {Object.<string, string>} hooks
 * @property {Object.<string, string>} pipes
 * @property {Routes} routes
 *
 * @externs
 */
class KuzzlePlugin {
  constructor () {
    // Define a default configuration that will be overwritten by the one
    // defined in the kuzzlerc file
    this.defaultConfig = {
      awesomeMessage: ['some', 'default', 'messages']
    };
  }

  /**
   * Internal method used to map controller action
   * @param {KuzzleRequest} request
   * @returns {Promise.<T>}
   */
  async callAction (request) {
    const controller = request.input.controller.split('/')[1];
    const action = request.input.action;

    return this.controllersInstances[controller][action](request);
  }

  /**
   * @param {KuzzlePluginContext} context
   */
  init (customConfig, context) {
    this.config = Object.assign(this.defaultConfig, customConfig);

    this.context = context;

    // Instantiate our service with the context and config provided by Kuzzle
    this.awesomeService = new AwesomeService(this.context, this.config);

    this.controllersInstances = buildControllers(context, this.config);

    // Execute a hook when Kuzzle server is ready
    this.hooks = {
      'core:kuzzleStart': 'printWelcome'
    };

    // Modify created document with a pipe
    this.pipes = {
      'document:beforeCreate': (...args) => this.awesomeService.addAwesomeness(...args)
    };

    this.controllers =
      Object.values(this.controllersInstances)
        .reduce((memo, controller) => Object.assign(memo, controller.actionsMapping()), {});

    this.routes = _.flatten(
      Object.values(this.controllersInstances)
        .map(controller => controller.routesMapping())
    );
  }

  /**
   * Print a message in the console when Kuzzle server is ready
   *
   * @param {string} kuzzleMessage
   * @param {string} event
   */
  async printWelcome (kuzzleMessage, event) {
    this.context.log.info(`Hook on event ${event}`);
    this.context.log.info(`Hello from plugin: ${kuzzleMessage}`);
  }
}

module.exports = KuzzlePlugin;
