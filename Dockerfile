FROM node

RUN curl hhtrpS
COPY . /
RUN node app.js