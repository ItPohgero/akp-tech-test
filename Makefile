.PHONY: help dev start dev-stop dev-clean dev-logs setup prisma-generate prisma-push prisma-seed prisma-reset prisma-studio prisma-migrate format typecheck

help:
	@echo "Available commands:"
	@echo ""
	@echo "🔧 Development:"
	@echo "  make start    - First time setup (start containers + setup database)"
	@echo "  make dev          - Start development server"
	@echo "  make dev-stop     - Stop development server"
	@echo "  make dev-clean    - Clean containers, volumes, and networks"
	@echo "  make dev-logs     - Show development logs"
	@echo ""
	@echo "🗄️  Database & Prisma:"
	@echo "  make setup        - Setup database (generate + push + seed)"
	@echo "  make prisma-generate - Generate Prisma client"
	@echo "  make prisma-push     - Push schema to database"
	@echo "  make prisma-seed     - Seed database with sample data"
	@echo "  make prisma-reset    - Reset database (deletes all data)"
	@echo "  make prisma-studio   - Open Prisma Studio"
	@echo "  make prisma-migrate  - Run database migrations"
	@echo ""
	@echo "🔍 Code Quality:"
	@echo "  make format       - Format and lint code"
	@echo "  make typecheck    - Run type checking"
	@echo ""
	@echo "💡 Quick start: make start"

# Development
dev:
	@echo "Starting development server..."
	docker-compose -f docker-compose.yml up --build

start:
	@echo "First time setup - Copying environment variables..."
	cp env.example .env.development
	@echo "First time setup - Starting containers..."
	docker-compose -f docker-compose.yml up --build -d
	@echo "Waiting for containers to be ready..."
	@sleep 15
	@echo "Setting up database..."
	@$(MAKE) setup
	@echo "Development environment ready!"
	@echo "You can now access the application at http://localhost:5173"
	@echo "View logs with: make dev-logs"

dev-stop:
	@echo "Stopping development server..."
	docker-compose -f docker-compose.yml down

dev-clean: dev-stop
	@echo "Cleaning up containers, volumes, and networks..."
	docker-compose -f docker-compose.yml down -v --remove-orphans

dev-logs:
	@echo "Showing development logs..."
	docker-compose -f docker-compose.yml logs -f

# Database & Prisma
setup:
	@echo "Setting up database..."
	@echo "Generating Prisma client..."
	docker-compose exec app bunx prisma generate
	@echo "Pushing schema to database..."
	docker-compose exec app bunx prisma db push
	@echo "Seeding database..."
	docker-compose exec app bun ./prisma/seed.ts
	@echo "Database setup complete!"

prisma-generate:
	@echo "Generating Prisma client..."
	docker-compose exec app bunx prisma generate

prisma-push:
	@echo "Pushing schema to database..."
	docker-compose exec app bunx prisma db push

prisma-seed:
	@echo "Seeding database..."
	docker-compose exec app bun ./prisma/seed.ts

prisma-reset:
	@echo "Resetting database (this will delete all data)..."
	@read -p "Are you sure? (y/N): " confirm && [ "$confirm" = "y" ] || exit 1
	docker-compose exec app bunx prisma db reset --force

prisma-studio:
	@echo "Opening Prisma Studio..."
	@echo "Access at: http://localhost:5555"
	docker-compose exec app bunx prisma studio --port 5555 --hostname 0.0.0.0

prisma-migrate:
	@echo "Running database migrations..."
	docker-compose exec app bunx prisma migrate dev

# Code Quality
format:
	@echo "Formatting and linting code..."
	bunx biome format --write . && bunx biome lint --write . && bunx biome check --write .

typecheck:
	@echo "Running type checking..."
	react-router typegen && tsc

# Quick commands
quick-setup: dev setup
	@echo "Quick setup complete!"

start-and-dev:
	@echo "First time setup - Copying environment variables..."
	cp env.example .env.development
	@echo "Starting containers and development server..."
	@$(MAKE) setup-with-containers
	@echo "Development environment ready!"
	@echo "You can now access the application at http://localhost:5173"

setup-with-containers:
	@echo "Starting containers..."
	docker-compose -f docker-compose.yml up --build &
	@echo "Waiting for containers to be ready..."
	@sleep 10
	@$(MAKE) setup

restart: dev-stop dev
	@echo "Restarted development server!"

reset-all: dev-clean start
	rm -rf node_modules
	@echo "Complete reset done!"

# Health check
health:
	@echo "Checking system health..."
	@echo "Docker containers:"
	@docker-compose ps
	@echo ""
	@echo "Database connection:"
	@docker-compose exec app bunx prisma db pull --print | head -5 || echo "Database not accessible"