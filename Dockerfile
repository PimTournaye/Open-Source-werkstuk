FROM node

WORKDIR /app

COPY ./package.json .
COPY ./package-lock.json .

RUN npm install --silent
RUN npm i -g nodemon
RUN npm i -g ts-node

COPY . .

EXPOSE 3000

CMD npm start