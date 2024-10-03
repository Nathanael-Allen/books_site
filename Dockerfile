FROM node:20-alpine 

RUN mkdir /app

WORKDIR /app

RUN mkdir /app/bookData

COPY . .

# RUN mv -v /app/private/books.db /app/bookData

RUN npm install --omit=dev

VOLUME [ "/app/bookData" ]

EXPOSE 3000

CMD node --env-file=.env app.js
