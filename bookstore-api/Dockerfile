FROM node:24.7.0-alpine

WORKDIR /bookstore-api/backend

COPY roles/defaults/.env.enc .env
COPY ./package*.json ./
COPY ./.eslintrc.js ./
COPY ./nest-cli.json ./
COPY ./tsconfig.build.json ./
COPY ./tsconfig.json ./
COPY ./.prettierrc ./
COPY src/ ./src

RUN npm ci

RUN npm run build
EXPOSE 3000

CMD ["node", "--max-http-header-size=100000", "./dist/main"]