#!/bin/bash

# Check if .env.local exists, if not create it
if [ ! -f .env.local ]; then
  echo "Creating empty .env.local file..."
  touch .env.local
  echo ".env.local created."
fi

# Start the development server
echo "Starting frontend development server..."
npm run dev 