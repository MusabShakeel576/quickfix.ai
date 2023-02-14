.PHONY: run-backend
run-backend:
	@echo "🌴 Running Backend"
	cd backend; \
	poetry run uvicorn src.api:app --reload

.PHONY: install-backend
install-backend:
	@echo "🍀 Installing Backend"
	cd backend; \
	cp ./.env.example ./.env; \
	poetry install

.PHONY: install-vscode-extension
install-vscode-extension:
	@echo "🌱 Installing VS Code Extension"
	cd vscode-extension; \
	yarn; \
	yarn config set prefix ~/.local; \
	yarn global add @vscode/vsce; \
	vsce package; \
	code --install-extension quickfix-ai-0.0.1.vsix