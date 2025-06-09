package main

import (
	"fmt"
	"net/http"

	"github.com/Roshan-anand/go-pod/internal/socket"
	"github.com/joho/godotenv"
)

func main() {
	godotenv.Load()

	hub := socket.NewHub()
	go hub.Run()

	mux := http.NewServeMux()

	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "text/plain")
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("Hello, World!"))
	})

	mux.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		socket.ServerWs(hub, w, r)
	})

	fmt.Println("Server is running on port 8080")
	if err := http.ListenAndServe(":8080", mux); err != nil {
		panic(err)
	}
}
