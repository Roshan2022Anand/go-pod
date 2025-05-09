package socket

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

// const (
// 	writeWait      = 10 * time.Second
// 	pongWait       = 60 * time.Second
// 	pingPeriod     = (pongWait * 9) / 10
// 	maxMessageSize = 512
// )

type Client struct {
	hub  *Hub
	conn websocket.Conn
	send chan []byte
}

func (c *Client) readPump() {
	defer func() {
		c.hub.unregister <- c
		c.conn.Close()
	}()

	// c.conn.SetReadLimit(maxMessageSize)
	// c.conn.SetReadDeadline(time.Now().Add(pongWait))
	// c.conn.SetPongHandler(func(string) error { c.conn.SetReadDeadline(time.Now().Add(pongWait)); return nil })

	for {
		_, msg, err := c.conn.ReadMessage()
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("error: %v", err)
			}
			break
		}

		var events map[string]interface{}
		if err := json.Unmarshal(msg, &events); err != nil {
			log.Fatal("err while unmarshaling event:", err)
			continue
		}

		switch events["event"] {
		case "create:room":
			fmt.Println(events)
		}
	}
}

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

// to upgrade the client http to ws
func ServeWs(hub *Hub, w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}
	client := &Client{hub: hub, conn: *conn, send: make(chan []byte, 256)}
	client.hub.register <- client

	// go client.writePump()
	go client.readPump()
}
