FROM node

WORKDIR /usr/src/app

COPY tsconfig.json ./
COPY package*.json ./

RUN npm i
RUN npm i -g typescript

COPY . .

EXPOSE 8080

CMD [ "node", "./src/dist/server.js" ]