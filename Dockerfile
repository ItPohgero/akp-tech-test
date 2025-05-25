FROM oven/bun:1.2.10-debian

# Install OpenSSL 3.0.x
RUN apt-get update && apt-get install -y \
    openssl \
    libssl3 \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy package files
COPY package.json bun.lockb ./
COPY prisma ./prisma/

# Install dependencies
RUN bun install

# Generate Prisma client
RUN bunx prisma generate

# Copy source code
COPY . .

# Build application
RUN bun run build

EXPOSE 5173

CMD ["bun", "./build/server/index.js"]