#!/bin/bash

# Check if .env.local exists, if not create it with placeholders
if [ ! -f .env.local ]; then
  echo "Creating .env.local with placeholder values..."
  echo "VITE_SUPABASE_URL=https://example.supabase.co" > .env.local
  echo "VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder" >> .env.local
  echo ".env.local created. Please update with your actual Supabase credentials."
fi

# Start the development server
echo "Starting frontend development server..."
npm run dev 