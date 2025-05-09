package main

import (
	"fmt"
	"net/http"
	"os"
	"server/internal/config/socket"

	"github.com/joho/godotenv"
	"github.com/rs/cors"
)

func main() {
	godotenv.Load()
	mux := http.NewServeMux()

	// to config the socket hub
	hub := socket.NewHub()
	go hub.Run()

	//cors to allow all origins
	handler := cors.New(cors.Options{
		AllowedOrigins:   []string{os.Getenv("FRONTEND_URL")},
		AllowCredentials: true,
	}).Handler(mux)

	mux.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		socket.ServeWs(hub, w, r)
	})

	fmt.Println("Starting server on :8080")
	if err := http.ListenAndServe(":8080", handler); err != nil {
		panic(err)
	}
}
