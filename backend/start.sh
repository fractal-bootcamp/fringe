#!/bin/bash
# Install dependencies
docker-compose up -d
# Seed the database
npx prisma migrate dev
# Start the server
bun run prisma/seed.ts
# Seed matches and messages
bun run prisma/seedMatchesAndMessages.ts
