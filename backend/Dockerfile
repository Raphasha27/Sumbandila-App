# Base image
FROM node:18-alpine

# Working directory
WORKDIR /app

# Install dependencies (caching layer)
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Expose API port
EXPOSE 4000

# Start command
CMD ["node", "server.js"]
