#!/bin/bash
# Install dependencies
docker-compose up -d
# Migrate the database
npx prisma migrate dev

# Seed the database
bun run prisma/seed.ts
bun run prisma/seedMatchesAndMessages.ts

