# Stage 1: Base stage using Node
FROM node:latest AS base

# Set the working directory inside the container
WORKDIR /app

# Copy the package and lock files to the working directory
COPY ./backend/package.json ./backend/package-lock.json ./

# Install prisma globally
RUN npm install -g prisma

# Install bun
RUN npm install -g bun

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY ./backend .

# Generate prisma client
RUN npx prisma generate

# Run the prisma migrations and application
CMD ["sh", "-c", "npx prisma migrate deploy && bun run --watch index.ts"]