# Kuzzle, VueJS and Bootstrap boilerplate

A pretty fat boilerplate to start-off webapp projects based on Kuzzle and VueJS.
This boilerplate is composed of a **backend**, located in `./backend` and a **frontend**, located in `./frontend`.

Each layer of the stack contains its corresponding `README.md` file. Please refer to it.

## Overview

This boilerplate provides you with

- A dockerized instance of Kuzzle, ready to be extended with a...
  - ...plugin boilerplate mounted as a volume in the Kuzzle Docker container.
- A VueJS web application based on the Kuzzle SDK v7-beta, including:
  - an implementation of the authentication method integrated with Vuex,
  - an implementation of the "Offline mode", also integrated with Vuex,
  - a complete i18n setup based on vue-i18n,
  - a complete Bootstrap-Vue installation (with fortawesome 5),
  - an instance of the vue-izitoast plugin
  - a ready-to-go Cypress.io installation for e2e testing
  
## Get trained by the creators of Kuzzle :zap:

Train yourself and your teams to use Kuzzle to maximize its potential and accelerate the development of your projects.  
Our teams will be able to meet your needs in terms of expertise and multi-technology support for IoT, mobile/web, backend/frontend, devops.  
:point_right: [Get a quote](https://hubs.ly/H0jkfJ_0)

## Install

Clone this repository using the following command

```bash
git clone --recurse-submodules https://github.com/kuzzleio/kuzzle-vuejs-coreui-boilerplate.git
```

> Note that the `--recurse-submodules` is important since the `backend` folder is a submodule pointing to the [Kuzzle Plugin
> Advanced Boilerplate](ttps://github.com/kuzzleio/kuzzle-plugin-advanced-boilerplate).

Then, delete the Git tree and reinitialize the repo from scratch

```bash
cd kuzzle-vuejs-coreui-boilerplate
rm -rf .git
```

At this point you may rename the folder of your project to a meaningful name.
Then, you can set remote(s) the usual way

```bash
git init
git remote add origin <another-git-server-URL-here>
```

## And then what?

Start your local Kuzzle instance by typing

```bash
docker-compose -f backend/docker/docker-compose.yml up -d
```

Serve your web app locally by typing

```bash
cd frontend
npm install && npm run serve
```

Take a look at the `README.md` files in the `backend` and `frontend` directories to do the next steps.
