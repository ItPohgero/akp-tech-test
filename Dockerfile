# ========== BUILD STAGE ==========
FROM oven/bun:1.1.13 AS builder

WORKDIR /app

# Copy package files
COPY package.json bun.lock ./

# Copy Prisma schema files
# COPY prisma ./prisma/

# Install all dependencies (including dev dependencies)
RUN bun install --frozen-lockfile

# Copy all project files
COPY . .

# Build the application
RUN bun run build

# Generate Prisma Client in the builder stage
# RUN bunx prisma generate

# ========== PRODUCTION STAGE ==========
FROM oven/bun:1.1.13-slim

WORKDIR /app

# Copy package files
COPY --from=builder /app/package.json /app/bun.lock ./

# Copy Prisma schema and generated client
# COPY --from=builder /app/prisma ./prisma
# COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
# COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

# Install only production dependencies
RUN bun install --production

# Copy built application
COPY --from=builder /app/build ./build

ENV NODE_ENV=production

EXPOSE 3000

CMD ["bun", "start"]