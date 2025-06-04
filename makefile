go : 
	@clear && \
	cd backend && \
	go mod tidy && \
	go build -o server cmd/main.go && \
	./server

dev-client :
	@clear && \
	cd frontend && \
	pnpm dev

dev-server :
	@clear && \
	cd nodejs && \
	pnpm dev

prod-client :
	@clear && \
	cd frontend && \
	pnpm clean && \
	pnpm build && \
	pnpm preview --port 5173 

prod-server :
	@clear && \
	cd nodejs && \
	pnpm build && \
	pnpm start