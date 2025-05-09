server : 
	@cd backend && \
	go mod tidy && \
	go build -o server cmd/main.go && \
	./server