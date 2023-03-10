FROM alpine:latest

#Install node
RUN apk add --update nodejs npm
WORKDIR /app

#Copy Dependencies
COPY package.json package.json
COPY package-lock.json package-lock.json

#Install Dependencies
RUN npm install

#Copy App
COPY . .


ENTRYPOINT [ "node", "/app/src/server.js" ]