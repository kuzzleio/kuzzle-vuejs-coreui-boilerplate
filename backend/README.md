# Kuzzle Plugin Advanced Boilerplate

Here, you'll find the boilerplate to start coding a new [Kuzzle Core Plugin](http://docs.kuzzle.io/guide/essentials/plugins/). A Core Plugin allows you to

* [listen asynchronously](http://docs.kuzzle.io/plugins-reference/plugins-features/adding-hooks), and perform operations that depend on data-related events;
* [listen synchronously](http://docs.kuzzle.io/plugins-reference/plugins-features/adding-pipes), and approve, modify and/or reject data-related queries;
* [add a controller route](http://docs.kuzzle.io/plugins-reference/plugins-features/adding-controllers) to expose new actions to the API;
* [add an authentication strategy](http://docs.kuzzle.io/plugins-reference/plugins-features/adding-authentication-strategy) to Kuzzle.

This boilerplate allows you to quickly start developing a Kuzzle plugin.  
It proposes an architecture to better separate the different files of the plugin, especially the controllers.  

It is recommended to use the Kuzzle Docker stack provided with the boilerplate in order to take advantage of the plugin's hot reload each time the code is modified.

## Plugin development

## PluginContext class

Each class can inherit the [PluginContext](lib/PluginContext.js) class , the only constraint is that the constructor of this class must be called with the context and configuration of the plugin provided by Kuzzle and passed to the [init](KuzzlePlugin.js#51) method of the plugin.  

It is then possible to use the following helpers:
 - `this.throwError(errorType, message)`: Throws a KuzzleError
 - `this.param(request, paramPath)`: Extracts a parameter from the request input
 - `this.stringParam(request, paramPath)`: Extracts a string parameter from the request input
 - `this.booleanParam(request, paramPath)`: Extract a boolean parameter from the request input
 - `this.floatParam(request, paramPath)`: Extract a float parameter from the request input
 - `this.integerParam(request, paramPath)`: Extract an integer parameter from the request input
 - `this.objectParam(request, paramPath)`: Extract an object parameter from the request input
 - `this.arrayParam(request, paramPath)`: Extract an array parameter from the request input
 

### Add controller

This boilerplate allows you to decouple the logic of the different controllers in different files.  
New controllers must be added to the `lib/controllers/` directory and inherit the `BaseController` class.  
Each controller is responsible for reporting his actions and routes. The actions declared in a controller must correspond to the controller's methods.  

```js
class ExampleController extends BaseController {

  constructor (context, config) {
    super(context, config)

    // Name of the controller
    // used to generate HTTP routes and Kuzzle API request
    this.name = 'example'

    /*
     * Corresponding action in Kuzzle API
     *  {
     *    controller: 'kuzzle-plugin-advanced-boilerplate/example'
     *    action: 'info'
     *  }
     */
    this.actions = [
      'info'
    ]

    // Generated route: GET _plugin/kuzzle-plugin-advanced-boilerplate/example/info
    this.routes = [
      { verb: 'get', url: '/info', action: 'info'}
    ]
  }

  async info (request) {
    return `Hello from example/info. Current user id: ${request.context.user._id}`
  }
}
```

Then in order to be loaded by Kuzzle, the new controller must be added to the file exports `lib/controllers/index.js`:
```js
module.exports = (context, config) => ({
  example: new ExampleController(context, config)
})
```

### Declare hooks and pipes

Hooks and pipes must be declared in the file `KuzzlePlugin.js`.  

```js
  init (customConfig, content) {
    // [...]

    // Execute a hook when Kuzzle server is ready
    this.hooks = {
      'core:kuzzleStart': (...args) => this.printWelcome(...args)
    }

    // [...]  
  }

  async printWelcome (message, event) {
    this.context.log.info(`Hook on event ${event}`)
    this.context.log.info(`Hello from plugin: ${message}`)

    return true
  }
```

## Plugin deployment

### On a pristine Kuzzle stack

You can use the [docker-compose.yml](docker/docker-compose.yml) file included in this repository to start a development-oriented stack to help you creating your custom Kuzzle Core plugin.

Clone this repository locally and type:

```bash
$ docker-compose -f docker/docker-compose.yml up
```

This command will start a Kuzzle stack with this plugin enabled. To make development more confortable, a watcher will also be activated, restarting Kuzzle every time a modification is detected.

### On an existing Kuzzle

Clone this repository locally and make it accessible from the `plugins/enabled` directory relative to the Kuzzle installation directory. A common practice is to put the code of the plugin in `plugins/available` and create a symbolic link to it in `plugins/enabled`.

**Note.** If you are running Kuzzle within a Docker container, you will need to mount the local plugin installation directory as a volume in the container.

Please refer to the Guide for further instructions on [how to install Kuzzle plugins](http://docs.kuzzle.io/guide/essentials/plugins/#managing-plugins).

#### Working on a different Kuzzle tag

You can choose to work on the Kuzzle development branch by defining the following environment variables before launching `docker-compose`:

```bash
$ export KUZZLE_DOCKER_TAG=1.4.2
$ docker-compose -f docker/docker-compose.yml up
```

These environment variables enable you to specify any existing build tag available on [Docker Hub](https://hub.docker.com/r/kuzzleio/kuzzle/tags/).

#### Customizing the plugin instance name

You may like to name your plugin differently than the name of this repo. 
To do so, you have to replace `kuzzle-plugin-advanced-boilerplate` with the name of your choice in the following files:
 - `package.json`
 - `manifest.json`
 - `docker/kuzzlerc`
 - `docker/docker-compose.yml`

## `manifest.json` file

`manifest.json` are here to describe usage of your plugin:

```js
{
  /**
   * This is metadata to describe your plugin
   */
  "name": "name-of-your-plugin",
  "version": "2.3.1",

 /**
  * Define which core version this plugin is designed for.
  * Use semver notation to born Kuzzle version this plugins supports
  * - if set, and installation requirement is not meet, an error will be thrown and Kuzzle will not start
  */
  "kuzzleVersion": ">=1.6.0 <2.0.0"
}
```
