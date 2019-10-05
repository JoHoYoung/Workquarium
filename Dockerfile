FROM node:10

WORKDIR /app

COPY package.json /app/
COPY package-lock.json /app/

RUN npm install

COPY . /app


ENTRYPOINT ["npm","run","local"]