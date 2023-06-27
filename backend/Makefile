.PHONY: run-backend
run-backend:
	@echo "🌴 Running Backend"
	poetry run uvicorn src.api:app --reload

.PHONY: install-backend
install-backend:
	@echo "🍀 Installing Backend"
	cp ./.env.example ./.env; \
	poetry install
