#!/bin/bash
# Install dependencies
docker-compose up -d

# Migrate the database
npx prisma migrate dev


