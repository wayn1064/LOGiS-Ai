FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN apk add --no-cache openssl
RUN npm ci

# Copy source code and Prisma config
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build TypeScript code
RUN npm run build

# Expose backend port
EXPOSE 5005
ENV PORT=5005
# Run the node app with Prisma DB Push to ensure tables exist
CMD ["sh", "-c", "npx prisma db push --accept-data-loss && node dist/index.js"]
