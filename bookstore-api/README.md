# Bookstore API

## Environment

- Create .env and .env.production files in the root directory with the following content

```shell
NODE_ENV=dev
PORT=3000

POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=admin
POSTGRES_PASSWORD=admin
POSTGRES_DB=book_store

ACCESS_TOKEN_SECRET={your_secret_phrase}
```

## Init, seed database

- Init PostgresQL in Docker

```shell
  npm i
  npm run db:up
```

- Generate migrations

```shell
  npm run migration:generate --name={migrationName}
```

- Run migrations

```shell
npm run migration:run
```

- Seed DB

```shell
npm run migration:run
```

## Development

Set NODE_ENV=dev

Run:

```shell
npm run dev
```
