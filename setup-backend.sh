#!/bin/bash

# Navigate to the backend directory
cd "$(dirname "$0")/backend"

# Install dependencies
npm install

echo "Backend dependencies installed successfully!"

# Return to the original directory
cd ..