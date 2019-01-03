FROM node:11.2.0
MAINTAINER Leon Chen

RUN npm install -g yarn
RUN mkdir -p /nomisma/web
COPY ./package.json /nomisma/web
RUN cd /nomisma/web; yarn

COPY ./ /nomisma/web
CMD ["yarn", "dev"]