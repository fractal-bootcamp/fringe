#!/bin/bash

DATABASE_URL="postgresql://postgres:postgres@localhost:10001"

# SQL command to clear all tables
psql $DATABASE_URL << EOF
-- Disable foreign key checks temporarily
SET session_replication_role = 'replica';

TRUNCATE TABLE "Message" CASCADE;
TRUNCATE TABLE "Match" CASCADE;
TRUNCATE TABLE "Like" CASCADE;
TRUNCATE TABLE "Prompt" CASCADE;
TRUNCATE TABLE "Company" CASCADE;
TRUNCATE TABLE "Applicant" CASCADE;
TRUNCATE TABLE "User" CASCADE;

-- Re-enable foreign key checks
SET session_replication_role = 'origin';
EOF

echo "All tables have been cleared successfully!" 