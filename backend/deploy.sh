#!/bin/bash

# Generate Prisma client
npx prisma generate

# Migrate the database
npx prisma migrate deploy

# Start the server
bun run --watch index.ts
