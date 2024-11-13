#!/bin/bash

# Install OpenSSL
apt-get update && apt-get install -y openssl

# Generate Prisma client
npx prisma generate

# Migrate the database
npx prisma migrate deploy

# Start the server
bun run prisma/seed.ts

# Seed matches and messages
bun run prisma/seedMatchesAndMessages.ts

# Start the server
bun run --watch index.ts
