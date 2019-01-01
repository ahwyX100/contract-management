# Contract management Web App

> a code chanllenge for nomisma frontend interview

## Requirement
- node.js (>=9.2.0)
- yarn
- json-server
- docker (optional)

## App Setup

We have two ways to startup app, you can choose either of them.
### 1. Docker container
If you have docker installed, you can directly run `docker-compose up` under root directory.

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
Just typing `yarn build` under root directory.
