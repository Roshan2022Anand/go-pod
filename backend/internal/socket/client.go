package socket

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

// represents a client
type Client struct {
	hub  *Hub
	conn *websocket.Conn
	send chan []byte
}

// it reads the incomming msg from the client
func (c *Client) readPump() {

	//this function will run after any error caused while reading the msg
	//to tell hub that the client is unregistered
	defer func() {
		c.hub.unregister <- c
		c.conn.Close()
	}()

	for {
		// read the incomming msg
		_, msg, err := c.conn.ReadMessage()
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("error while reading message: %v", err)
			}
			break
		}

		//unmarshal the msg
		var evMsg interface{}
		err = json.Unmarshal(msg, &evMsg)
		if err != nil {
			log.Printf("error while unmarshalling message: %v", err)
			continue
		}

		fmt.Println("Received message:", evMsg)
		c.send <- []byte("hai from server")
	}

}

// it writes the msg back to the given client
func (c *Client) writePump() {
	defer func() {
		c.conn.Close()
	}()

	//triggers when channel send have new data
	for {
		select {
		case msg, ok := <-c.send:
			if !ok {
				c.conn.WriteMessage(websocket.CloseMessage, []byte{})
				return
			}

			w, err := c.conn.NextWriter(websocket.TextMessage)
			if err != nil {
				return
			}
			w.Write(msg)
		}
	}
}

// to upgrade the HTTP to Websocket connection
//
// upgrader given by gorilla/websocket package
// used to set upgrader
var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

//warning chage the origin as needed

// main http handler that upgrades the connection
func ServerWs(hub *Hub, w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}
	client := &Client{hub: hub, conn: conn, send: make(chan []byte, 256)}
	client.hub.register <- client

	// go client.writePump()
	go client.readPump()
}
