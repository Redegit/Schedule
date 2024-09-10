FROM node:20

WORKDIR /

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3031

CMD [ "node", "./src/server.js"]
