package socket

import "sync"

type Room struct {
	Clients map[*Client]bool
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
			h.mu.Unlock()
		case client := <-h.unregister:
			h.mu.Lock()
			if _, ok := h.clients[client]; ok {
				delete(h.clients, client)
				close(client.send)
			}
			h.mu.Unlock()
		}
	}
}
