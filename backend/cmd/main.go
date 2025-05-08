package main

import (
	"fmt"
	"net/http"
)

func main() {

	mux := http.NewServeMux()

	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("Welcome to server"))
	})

	fmt.Println("Starting server on :8080")
	if err := http.ListenAndServe(":8080", mux); err != nil {
		panic(err)
	}
}
