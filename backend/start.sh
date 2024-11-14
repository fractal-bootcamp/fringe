#!/bin/bash
# Remove all containers and images
docker rm -vf $(docker ps -aq)
docker rmi -f $(docker images -aq)

# Install dependencies
docker-compose up -d

# Migrate the database
npx prisma migrate dev


