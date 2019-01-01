FROM node:11.2.0
MAINTAINER Leon Chen

RUN npm install -g yarn
RUN yarn global add json-server
RUN mkdir -p /nomisma/web
COPY ./package.json /nomisma/web
RUN cd /nomisma/web; yarn

COPY ./ /nomisma/web
RUN cd /nomisma/web; json-server --watch ./backEnd/db.json --routes ./backEnd/routes.json --port 4000
CMD ["yarn", "dev"]