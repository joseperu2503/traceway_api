<p align="center">
<img src="assets/icons/icon.png" width="150"  alt="logo">
</p>

# TraceWay API

## Installation

### Environments

```bash
cp .env.example .env
```

```bash
nano .env
```

## Start all services in development mode with Docker:

```bash
docker compose -f docker-compose.dev.yml --env-file .env.dev -p traceway_api_dev up --build
```

## Run the API in detached, production-ready mode:

```bash
docker compose -f docker-compose.prod.yml --env-file .env.prod -p traceway_api_prod up -d --build
```

## Running Migrations

1. Enter the running container:

```bash
docker exec -it traceway_api sh
```

2. Execute pending migrations:

```bash
npm run migrations:run
```

3. Seed the database inside the container:

```bash
npm run cli -- seed
npm run cli:prod -- seed
```

4. Exit the container:

```bash
exit
```

## Generating Migrations

```bash
npm run migrations:generate database/migrations/<MigrationName>
```

Example:

```bash
npm run migrations:generate database/migrations/create-places-table
```
