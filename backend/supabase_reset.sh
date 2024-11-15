#!/bin/bash

PROJECT_REF="wshdjqjzsncpchcvnqcm"

supabase link --project-ref $PROJECT_REF

supabase db reset --linked

echo "Supabase database reset complete!"