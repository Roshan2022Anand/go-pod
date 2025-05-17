package socket

import (
	"fmt"
	"sync"
)

type Room struct {
	Clients map[string]*Client
}
type Hub struct {
	register   chan *Client
	unregister chan *Client
	clients    map[*Client]bool
	rooms      map[string]*Room
	mu         sync.Mutex
}

// to create a new hub
func NewHub() *Hub {
	return &Hub{
		register:   make(chan *Client),
		unregister: make(chan *Client),
		clients:    map[*Client]bool{},
		rooms:      map[string]*Room{},
	}
}

// to register the client
func (h *Hub) Run() {
	for {
		select {
		case client := <-h.register:
			h.mu.Lock()
			h.clients[client] = true
			fmt.Println("client registered", client.conn.RemoteAddr())
			h.mu.Unlock()
		case client := <-h.unregister:
			h.mu.Lock()
			if _, ok := h.clients[client]; ok {

				//remove client from room
				if client.roomID != "" {
					delete(h.rooms[client.roomID].Clients, client.email)
					if len(h.rooms[client.roomID].Clients) == 0 {
						delete(h.rooms, client.roomID)
					}
					fmt.Println(client.name, "removed from room", client.roomID)
				}

				//remove client from hub
				delete(h.clients, client)
				close(client.send)
			}
			fmt.Println("client unregistered", client.conn.RemoteAddr())
			h.mu.Unlock()
		}
	}
}
