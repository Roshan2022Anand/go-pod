package main

import (
	"fmt"
	"net/http"
	"os"

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
	})

	port := os.Getenv("PORT")
	fmt.Println("Server is running on http://localhost:" + port)
	if err := http.ListenAndServe(":"+port, mux); err != nil {
		panic(err)
	}
}
