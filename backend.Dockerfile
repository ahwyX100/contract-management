FROM node:11.2.0
MAINTAINER Leon Chen

RUN npm install -g json-server
RUN mkdir -p /nomisma/backend
COPY ./backEnd/db.json /nomisma/backend/db.json
COPY ./backEnd/routes.json /nomisma/backend/routes.json

CMD ["nohup", "json-server", "-H", "0.0.0.0", "/nomisma/backend/db.json", "--routes", "/nomisma/backend/routes.json", "--port", "4000", "<", "server.logs", "&"]