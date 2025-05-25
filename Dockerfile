# Multi-stage build untuk production yang optimal
FROM oven/bun:canary-slim as base
WORKDIR /app

# Install dependencies
FROM base as deps
COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile

# Build stage
FROM deps as build
COPY . .
COPY prisma ./prisma
RUN bunx prisma generate
RUN bun run build

# Production stage
FROM base as production
ENV NODE_ENV=production

# Copy dependencies dan build results
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/build ./build
COPY --from=build /app/prisma ./prisma
COPY package.json ./

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/ || exit 1

# Start command
CMD ["bun", "run", "start"]