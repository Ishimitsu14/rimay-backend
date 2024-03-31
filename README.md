## Description

[Rimay](https://rimay.io/) Build your AI workflow With advanced prompt lab
## Installation

```bash
$ yarn install
```

## Running the app

```bash
# Copy and setup environment
$ cp .env.example .env

# Start postgresql database
$ docker-compose up --build -d

# Generate prisma types and client for all services
$ yarn prisma:generate

# Development all services
$ yarn start:dev

# Production mode all services
$ yarn start:prod

# Watch mode
$ yarn watch {service_name}
```

## Running migration

```bash
# Create a migration from changes in Prisma schema, apply it to the database, trigger generators (e.g. Prisma Client)
$ yarn prisma:migrate dev

# Reset your database and apply all migrations
$ yarn prisma:migrate reset

# Apply pending migrations to the database
$ yarn prisma:migrate deploy

# You can run these commands for the selected service
$ yarn prisma:migrate {dev/reset/deploy} {service_name}
```

## Generate types and client from prisma scheme
```bash
# Generate prisma types and client for all services
$ yarn prisma:generate

# Generate prisma types and client for selected service
$ yarn prisma:generate {service_name}
```

## Generate types from proto file
### First you need install [protobuf-compiler](https://grpc.io/docs/protoc-installation/)

```bash
# Generate types for all services
$ yarn proto:generate

# Generate types for selected service
$ yarn proto:generate {service_name}
```
