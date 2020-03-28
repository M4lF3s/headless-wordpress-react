FROM node:latest as dev

WORKDIR /usr/src

CMD ["npm", "run", "dev"]


FROM dev as build

WORKDIR /usr/src

COPY src/* ./

RUN npm install \
    && npm run build


FROM node:latest as prod

# TODO: Copy built project and run server

CMD ["npm", "run", "start"]