FROM node:20-alpine

WORKDIR /app

COPY package*.json .

RUN npm install

RUN npx prisma generate

COPY . .

EXPOSE 9000

RUN npm run build

CMD npm run start:prod