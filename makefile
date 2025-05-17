server : 
	@clear && \
	cd backend && \
	go mod tidy && \
	go build -o server cmd/main.go && \
	./server

client :
	@clear && \
	cd frontend && \
	pnpm dev