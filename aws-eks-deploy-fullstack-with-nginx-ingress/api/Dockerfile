FROM node:20-alpine

WORKDIR /app
COPY ./package*.json .
COPY ./yarn.lock .
RUN yarn install --frozen-lockfile 

COPY . .

CMD ["node", "index.js"]