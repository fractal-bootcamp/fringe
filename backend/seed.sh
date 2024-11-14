#!/bin/bash

# Seed the database
bun run prisma/seed.ts

# Seed the matches and messages
bun run prisma/seedMatchesAndMessages.ts

# Seed the likes
bun run prisma/seedLikes.ts
