package socket

import (
	"fmt"
	"sync"

	"github.com/pion/webrtc/v4"
)

type Propose struct {
	id    string
	Email string
	prop  string
	Track *webrtc.TrackLocalStaticRTP
}
type Tracks map[string]*Propose
type studio struct {
	name      string
	roomID    string
	clients   map[string]*Client
	tracks    Tracks
	sendTrack chan *webrtc.TrackLocalStaticRTP
}

type Hub struct {
	client     map[*Client]bool
	register   chan *Client
	unregister chan *Client
	studios    map[string]*studio
	mu         sync.Mutex
}

func NewHub() *Hub {
	return &Hub{
		client:     make(map[*Client]bool),
		register:   make(chan *Client),
		unregister: make(chan *Client),
		studios:    make(map[string]*studio),
	}
}

func (h *Hub) Run() {
	for {
		select {
		case c := <-h.register:
			h.mu.Lock()
			h.client[c] = true
			fmt.Println("client connected", c.conn.RemoteAddr())
			h.mu.Unlock()
		case c := <-h.unregister:
			h.mu.Lock()

			// remove client form the studio
			if c.studio != nil {
				delete(c.studio.clients, c.email)
				fmt.Println("removed form studio", c.email)
				//remove studio from the hub if no clients left
				if len(c.studio.clients) == 0 {
					delete(h.studios, c.studio.roomID)
					fmt.Println("studio removed", c.studio.name)
				}
			}

			delete(h.client, c)
			c.conn.Close()
			fmt.Println("client disconnected", c.conn.RemoteAddr())
			h.mu.Unlock()
		}
	}
}
