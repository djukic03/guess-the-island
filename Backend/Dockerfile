FROM node
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 5000
RUN npm install -g nodemon
CMD [ "nodemon", "server.js" ]