server : 
	@clear && \
	cd backend && \
	go mod tidy && \
	go build -o server cmd/main.go && \
	./server

dev-client :
	@clear && \
	cd frontend && \
	pnpm dev

prod-client :
	@clear && \
	cd frontend && \
	pnpm clean && \
	pnpm build && \
	pnpm preview --port 5173 