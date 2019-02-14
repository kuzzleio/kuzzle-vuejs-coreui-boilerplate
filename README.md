# Kuzzle, VueJS and CoreUI-Bootstrap boilerplate

A pretty fat boilerplate to start-off webapp projects based on Kuzzle and VueJS.
This boilerplate is composed of a **backend**, located in `./backend` and a **frontend**, located in `./frontend`.

Each layer of the stack contains its corresponding `README.md` file. Please refer to it.

## Overview

This boilerplate provides you with

- A dockerized instance of Kuzzle, ready to be extended with a...
  - ...plugin boilerplate mounted as a volume in the Kuzzle Docker container.
- A VueJS web application based on the Kuzzle SDK v6-beta, including:
  - an implementation of the authentication method integrated with Vuex,
  - an implementation of the "Offline mode", also integrated with Vuex,
  - a complete i18n setup based on vue-i18n,
  - a complete CoreUI and Bootstrap-Vue installation (with Fontawesome 4),
  - an instance of the vue-izitoast plugin
  - a ready-to-go Cypress.io installation for e2e testing
