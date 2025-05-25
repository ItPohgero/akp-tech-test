.PHONY: help dev dev-first dev-stop dev-clean dev-logs setup prisma-generate prisma-push prisma-seed prisma-reset prisma-studio prisma-migrate format typecheck

help:
	@echo "Available commands:"
	@echo ""
	@echo "🔧 Development:"
	@echo "  make dev-first    - First time setup (start containers + setup database)"
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
	@echo "💡 Quick start: make dev-first"

# Development
dev:
	@echo "Starting development server..."
	bun run docker:dev

dev-first:
	@echo "First time setup - Starting containers..."
	bun run docker:dev &
	@echo "Waiting for containers to be ready..."
	@sleep 10
	@echo "Setting up database..."
	$(MAKE) setup
	@echo "Development environment ready!"
	@echo "You can now access the application at http://localhost:5173"

dev-stop:
	@echo "Stopping development server..."
	bun run docker:dev:down

dev-clean:
	@echo "Cleaning up containers, volumes, and networks..."
	bun run docker:dev:clean

dev-logs:
	@echo "Showing development logs..."
	bun run docker:dev:logs

# Database & Prisma
setup:
	@echo "Setting up database..."
	@echo "Generating Prisma client..."
	bun run docker:prisma:generate
	@echo "Pushing schema to database..."
	bun run docker:prisma:db:push
	@echo "Seeding database..."
	bun run docker:prisma:db:seed
	@echo "Database setup complete!"

prisma-generate:
	@echo "Generating Prisma client..."
	bun run docker:prisma:generate

prisma-push:
	@echo "Pushing schema to database..."
	bun run docker:prisma:db:push

prisma-seed:
	@echo "Seeding database..."
	bun run docker:prisma:db:seed

prisma-reset:
	@echo "Resetting database (this will delete all data)..."
	@read -p "Are you sure? (y/N): " confirm && [ "$$confirm" = "y" ] || exit 1
	bun run docker:prisma:db:reset

prisma-studio:
	@echo "Opening Prisma Studio..."
	@echo "Access at: http://localhost:5555"
	bun run docker:prisma:studio

prisma-migrate:
	@echo "Running database migrations..."
	bun run docker:prisma:migrate

# Code Quality
format:
	@echo "Formatting and linting code..."
	bun run format

typecheck:
	@echo "Running type checking..."
	bun run typecheck

# Quick commands
quick-setup: dev setup
	@echo "Quick setup complete!"

restart: dev-stop dev
	@echo "Restarted development server!"

reset-all: dev-clean dev-first
	@echo "Complete reset done!"

# Health check
health:
	@echo "Checking system health..."
	@echo "Docker containers:"
	@docker-compose ps
	@echo ""
	@echo "Database connection:"
	@bun run docker:prisma:db:pull --print | head -5 || echo "Database not accessible"