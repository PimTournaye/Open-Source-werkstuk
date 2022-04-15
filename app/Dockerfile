FROM node

WORKDIR /usr/src/app

COPY ./app/package.json .
COPY ./app/package-lock.json .

RUN npm install --silent
RUN npm i -g nodemon
RUN npm i -g ts-node

COPY ./app .

CMD ["npm", "run", "dev"]