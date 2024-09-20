FROM node:20-alpine 

RUN apt install && apt upgrade

RUN useradd userguy

WORKDIR /app

USER userguy

COPY . .

RUN npm install --omit=dev

EXPOSE 3000

CMD node --env-file=.env app.js
