package socket

import (
	"encoding/json"
	"log"

	"github.com/Roshan-anand/go-pod/internal"
)

// to emit to the given client
func (c *Client) WsEmit(ev *WsEv) {
	data, err := json.Marshal(ev)
	if err != nil {
		log.Fatal("error while marshalling data:", err)
		return
	}

	c.send <- data
}

func (c *Client) createRoom(data WsData) {

	name := data["name"]
	email := data["email"]
	studioID := data["studioID"]

	c.name = name
	c.email = email

	//create a new studio
	id := internal.GenerateID(8)
	c.hub.mu.Lock()
	c.hub.studios[id] = &studio{
		name: studioID,
		clients: map[string]*Client{
			email: c,
		},
	}
	c.hub.mu.Unlock()

	rData := &WsEv{
		Event: "room:created",
		Data: WsData{
			"roomID": id,
		},
	}
	// ws.emit("room:created", { roomID });
	c.WsEmit(rData)
}

func (c *Client) joinRoom(data WsData) {
	roomID := data["roomID"]
	name := data["name"]
	email := data["email"]

	c.name = name
	c.email = email

	rData := &WsEv{}

	c.hub.mu.Lock()
	studio, exists := c.hub.studios[roomID]
	if !exists {
		c.hub.mu.Unlock()
		rData.Event = "error"
		rData.Data["msg"] = "Room does not exist"

		c.WsEmit(rData)
		return
	}

	studio.clients[email] = c
	c.hub.mu.Unlock()

	rData.Event = "room:joined"
	rData.Data["roomID"] = roomID
	c.WsEmit(rData)
}

func (c *Client) checkRoom(data WsData) {
	roomID := data["roomID"]
	studioID := data["studioID"]

	rData := &WsEv{
		Event: "room:checked",
	}

	c.hub.mu.Lock()
	studio, exists := c.hub.studios[roomID]
	if !exists || studio.name != studioID {
		c.hub.mu.Unlock()
		rData.Data["exist"] = "false"
		c.WsEmit(rData)
		return
	}
	c.hub.mu.Unlock()

	rData.Data["exist"] = "true"
	c.WsEmit(rData)
}