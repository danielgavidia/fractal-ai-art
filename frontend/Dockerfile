# Use Node for both build and serve stages
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY ./frontend/package.json ./frontend/package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY ./frontend .

# Build the Vite app
RUN npm run build

# Install a simple HTTP server to serve the static files
RUN npm install -g serve

# Expose the desired port
EXPOSE 5005

# Use the 'serve' package to serve the built files from the 'dist' directory
CMD ["serve", "-s", "dist", "-l", "5005"]
