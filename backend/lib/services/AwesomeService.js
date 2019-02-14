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
  PluginContext = require('../PluginContext');

class AwesomeService extends PluginContext {
  constructor (context, config) {
    // You must call the parent constructor with the context and the config
    // provided by Kuzzle and passed to the plugin init() method
    super(context, config);
  }

  /**
   * Adds a random awesome message to any created document
   *
   * @param {KuzzleRequest} request
   * @returns {Promise<KuzzleRequest>}
   */
  async addAwesomeness (request) {
    // Modify the document body before creation
    const awesomeMessage = this._getRandomAwesomeness();
    request.input.body.awesomeness = awesomeMessage;

    // Use the memoryStorage controller of the SDK to increment this message count in redis
    await this.context.accessors.sdk.ms.incr(awesomeMessage);

    return request;
  }

  _getRandomAwesomeness () {
    const randomIndex =
      Math.trunc(Math.random() * this.config.awesomeMessages.length);

    // The awesomeness messages can be configurated in the kuzzlerc configuration file
    return this.config.awesomeMessages[randomIndex];
  }
}

module.exports = AwesomeService;
