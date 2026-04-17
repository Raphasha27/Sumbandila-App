# ─────────────────────────────────────────────────────────
# Sumbandila — Developer Makefile
# Kirov Dynamics Engineering Standard
# ─────────────────────────────────────────────────────────

.PHONY: help dev build test lint format docker-up docker-down migrate logs check-env clean

help:
	@echo ""
	@echo "  Sumbandila — Available Commands"
	@echo "  ─────────────────────────────────────────────"
	@echo "  make dev          Start all services in development mode"
	@echo "  make build        Build all workspace packages"
	@echo "  make test         Run all workspace tests"
	@echo "  make lint         Lint all workspaces"
	@echo "  make format       Format backend (black) + frontend (prettier)"
	@echo "  make docker-up    Start full stack via docker-compose"
	@echo "  make docker-down  Tear down docker stack"
	@echo "  make migrate      Run database migrations (Supabase / Alembic)"
	@echo "  make logs         Stream docker-compose logs"
	@echo "  make check-env    Validate environment variables"
	@echo "  make clean        Remove build artifacts and caches"
	@echo ""

# ─── Development ─────────────────────────────────────────
dev:
	npm run dev

# ─── Build ───────────────────────────────────────────────
build:
	npm run build

# ─── Testing ─────────────────────────────────────────────
test:
	@echo "→ Running frontend/workspace tests..."
	npm run test
	@echo "→ Running backend service tests..."
	cd services && python -m pytest -v --tb=short

# ─── Linting ─────────────────────────────────────────────
lint:
	@echo "→ Linting JS/TS workspaces..."
	npm run lint
	@echo "→ Linting Python services..."
	cd services && flake8 . --max-line-length=120

# ─── Formatting ──────────────────────────────────────────
format:
	@echo "→ Formatting Python (black)..."
	cd services && black .
	@echo "→ Formatting JS/TS (prettier)..."
	npx prettier --write "apps/**/*.{ts,tsx,js,jsx,css}" "packages/**/*.{ts,tsx}"

# ─── Docker ──────────────────────────────────────────────
docker-up:
	docker-compose up --build -d
	@echo "✅ Stack running: check docker ps for ports"

docker-down:
	docker-compose down -v
	@echo "🛑 Stack stopped."

logs:
	docker-compose logs -f

# ─── Database ────────────────────────────────────────────
migrate:
	@echo "→ Applying database migrations..."
	cd services && alembic upgrade head

# ─── Environment Check ───────────────────────────────────
check-env:
	node scripts/integrity-check.js

# ─── Cleanup ─────────────────────────────────────────────
clean:
	@echo "→ Removing Python caches..."
	find . -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null || true
	find . -type d -name ".pytest_cache" -exec rm -rf {} + 2>/dev/null || true
	@echo "→ Removing JS build artifacts..."
	find . -type d -name ".next" -not -path "*/node_modules/*" -exec rm -rf {} + 2>/dev/null || true
	find . -type d -name "dist" -not -path "*/node_modules/*" -exec rm -rf {} + 2>/dev/null || true
	@echo "✅ Cleaned."
