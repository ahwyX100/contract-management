# Contract management Web App

> a code chanllenge for nomisma frontend interview

## Introduction
This simple demo app is to complete nomisma code challenge front end part. It contains some key parts of modern web app development from code writing, unit test, build, and a simple deployment which powerd by `docker`.

It is  built by Vue.js, the main framework covers `vue.js`, `vue-router`, `vuex`, `vue-i18n`, with a simple backend part built by [json-server](https://github.com/typicode/json-server).

`webpack` is the main build tool and you can customize the setting by your need. All settings are located in `build` and `config` folder.

`Jest` is our main unit test framework, along with [vue-test-utils](https://github.com/vuejs/vue-test-utils) to make write unit tests more funny.


## Requirement
- node.js (>=9.2.0)
- yarn
- json-server
- docker (optional)

## App Startup

We have two ways to startup app, you can choose either of them.
### 1. Docker container
If you have docker installed, you can directly run `docker-compose up -d` under root directory.

### 2. local install

```
# install json-server
yarn add global json-server

# install dependencies
yarn

# start backend server
json-server --watch ./backEnd/db.json --routes ./backEnd/routes.json --port 4000

# start dev server
yarn dev
```
you can access the app via `http://localhost:8080` by default.

## Test
You can run unit test by typing `yarn unit` under root directory.

## Build for production
Just typing `yarn build` under root directory. The generated folder generated in `dist` folder which by default.

## What's left behind
The unit test part is not fully covered right now. Only write some parts of them. Will complete all unit tests in the future.


