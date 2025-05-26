# Setup Guide

Panduan setup project untuk development dengan Docker dan Prisma.

## Prerequisites

- [Docker](https://www.docker.com/get-started) & Docker Compose
- [Bun](https://bun.sh/)

## Quick Start (Recommended)

```bash
# 1. Clone project
git clone https://github.com/ItPohgero/akp-tech-test
cd akp-tech-test

# 2. Install dependencies
bun install

# 3. Setup everything (one command)
make start
```

Perintah `make start` akan:
- Copy environment variables
- Start Docker containers
- Setup database dan seed data
- Siap untuk development!

**Akses aplikasi**: http://localhost:5173

## Manual Setup

Jika ingin setup step by step:

```bash
# 1. Copy environment file
cp env.example .env.development

# 2. Start containers
make dev

# 3. Setup database (di terminal baru)
make setup
```

## Common Commands

### Development
```bash
make start      # First time setup
make dev        # Start development server
make dev-stop   # Stop containers
make dev-logs   # View logs
make dev-clean  # Clean everything
```

### Database
```bash
make prisma-studio    # Open database GUI (port 5555)
make prisma-seed      # Add sample data
make prisma-reset     # Reset database (deletes data)
```

### Code Quality
```bash
make format     # Format & lint code
make typecheck  # Type checking
```

## Troubleshooting

**Containers not starting?**
```bash
make dev-clean  # Clean everything
make start      # Try again
```

**Database issues?**
```bash
make prisma-reset  # Reset database
make setup         # Regenerate & seed
```

**Need fresh start?**
```bash
make dev-clean
rm -rf node_modules
bun install
make start
```

## Project Structure

```
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.ts             # Sample data
├── app/                    # Application code
├── docker-compose.yml      # Docker config
├── Makefile                # Development commands
└── package.json            # Scripts & dependencies
```

## Help

Lihat semua perintah tersedia:
```bash
make help
```

---

**Ready to code!** Aplikasi berjalan di http://localhost:5173