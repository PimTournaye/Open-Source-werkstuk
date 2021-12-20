FROM node

WORKDIR /app

COPY ./package.json .
COPY ./package-lock.json .

RUN npm install --silent
RUN npm i -g nodemon
RUN npm i -g ts-node

COPY . .

VOLUME [ "- ./src:/usr/app/src" ]

EXPOSE 3000

CMD npm start