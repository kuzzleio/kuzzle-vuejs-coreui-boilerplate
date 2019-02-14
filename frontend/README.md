# The Frontend App

This is where your frontend application lives. You can perform the following actions:

- Project setup

```
npm install
```

- Compiles and hot-reloads for development

```
npm run serve
```

- Compiles and minifies for production

```
npm run build
```

- Run your tests

```
npm run test
```

- Lints and fixes files

```
npm run lint
```

- Run your end-to-end tests

```
npm run test:e2e
```

- Customize configuration
  See [Configuration Reference](https://cli.vuejs.org/config/).

## Kuzzle SDK

The Kuzzle SDK is encapsulated in the `@/services/kuzzle.js` service, always import the Kuzzls SDK instance from this module.

### Connecting to the Backend

You can store your backend connection parameters in the `@/config.json` file, in the `backends` field. There should be
at least a `local` backend in this object. You can switch the environment, either by hardcoding it in the `kuzzle` service
or by setting the `VUE_APP_BACKEND` variable to the name of the desired backend.

The provided implementation of the `kuzzle` service connects to the backend via the `Websocket` protocol. Change the call
to the constructor to the desired protocol if needed (learn more at https://docs-v2.kuzzle.io/sdk-reference/js/6/kuzzle/introduction/).

### Authenticate to Kuzzle

This boilerplate provides a standard implementation of the authentication using the `local` strategy. It consists of the
following items:

- the `@/vuex/auth.js` module,
- the `authenticationGuard` function declared in the router,
- the `@/views/Login.vue` component,
- the `logout` method in the `@/App.vue` component,
- the listeners declared in the `mounted` hook of the `@/App.vue` component.

After a successful login, the JSON Web Token (JWT) provided by the backend is automatically stored in the Local Storage
in the `user-token` key. This allows to keep the authenticated session live across page refreshes.

Apply the `authenticationGuard` the routes that you want to protect with authentication: this will allow the route to
be resolved only if a valid JWT is locally stored on the client.

### Resiliency to connection loss

The Kuzzle SDK provides the ability to implement a behavior for your app while the connection to the backend is not available
(learn more at https://docs-v2.kuzzle.io/sdk-reference/js/6/offline-tools/). This boilerplate provides a standard implementation
of this behavior (which may not fully fit all use-cases):

- whenever the connection is lost (Kuzzle SDK triggers the `disconnected` event), a toast is displayed to inform the user;
- if the user navigates to a new route while offline, the app displays a "Houston, we have a problem" page;
- whenever the connection is recovered, the toast is discarded and, if the offline-page was displayed, the app navigates
  to the required route.

The offline-page may seem quite overkill: after all, why not simply navigate to the required route and not display any
data coming from the backend? This may be preferrable to some use-cases but, in our current implementation of the authentication
system, we need to check the user's authentication token before navigating to a page. This operation requires sending a
request to the backend, which is not possible while offline. Plus, the `checkToken` action is non-queueable in the Kuzzle SDK.

The main implementation items are

- the `@/vuex/app.js` module,
- the `beforeEach` guard in the `@/router.js` module,
- the listeners declared in the `mounted` hook of the `@/App.vue` component.

### The internationalization

The app is fully i18n thanks to the [Vue-i18n](https://kazupon.github.io/vue-i18n/) plugin.
Locale messages are stored in the `@/locales` directory and this boilerplate only provides English to start.

You can use the `@/components/LocaleChanger.vue` component to live-change the locale in the app. This component reads
its available options in the `locales` field of the `@/config.json` file.

### CoreUI + Boostrap

The boilerplate ships with [Bootstrap-Vue](https://bootstrap-vue.js.org/) and [CoreUI](https://coreui.io/vue/) installed in your frontend. You can add variables to the `_variables.scss` file and add any customizations and hacks in `_custom.scss` (both in the `@/assets` directory). You can also drop IE-specific hacks in the `_ie-fix.scss` file.
