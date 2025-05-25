FROM oven/bun:canary-slim

WORKDIR /app

COPY package.json bun.lock tsconfig.json ./
COPY prisma ./prisma
COPY app ./app

RUN bun install

COPY .env.development .env

EXPOSE 5173

CMD ["bun", "run", "dev"]