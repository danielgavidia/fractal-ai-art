#!/bin/sh

# Backend
cd backend
bun install
npx prisma migrate dev
bun run --watch index.ts & # Run backend in the background

# Frontend
cd ../frontend
bun install

# Open a new terminal for frontend
gnome-terminal -- bash -c "bun run dev; exec bash"


