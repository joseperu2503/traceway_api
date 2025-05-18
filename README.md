# TraceWay API

## Installation

### Variables de entorno

```bash
cp .env.example .env
```

```bash
nano .env
```

## Para desarrollo

```bash
docker compose -f docker-compose.dev.yml --env-file .env.dev -p traceway_api_dev up --build
```

## Para produccion

```bash
docker compose -f docker-compose.prod.yml --env-file .env.prod -p traceway_api_prod up -d --build
```

# Migraciones

1. Entrar al contenedor:

```bash
docker exec -it traceway_api sh
```

2. Ejecutar el comando dentro del contenedor:

```bash
npm run migrations:run
```

3. (Opcional) Ejecutar Seeders

```bash
npm run cli -- seed
```

4. Salir:

```bash
exit
```

## Limpiar imagenes dangling

```bash
docker image prune -f
```

## Crear migraciones

```bash
npm run migrations:generate database/migrations/init
```
