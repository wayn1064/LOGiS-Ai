FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code and Prisma config
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build TypeScript code
RUN npm run build

# Expose backend port
EXPOSE 5001

# Run the node app
CMD ["node", "dist/index.js"]
