FROM node:14.7.0
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production
COPY app.js ./
CMD [ "node", "app.js" ]