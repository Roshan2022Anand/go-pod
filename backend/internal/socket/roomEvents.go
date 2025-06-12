package socket

import (
	"log"

	"github.com/Roshan-anand/go-pod/internal/utils"
)

// to create a new room
func (c *Client) createRoom(d *WsData) {
	name, ok1 := (*d)["name"].(string)
	email, ok2 := (*d)["email"].(string)
	studioID, ok3 := (*d)["studioID"].(string)
	if !ok1 || !ok2 || !ok3 {
		log.Println("createRoom: missing or invalid fields in data:", d)
		return
	}

	c.name = name
	c.email = email

	//create a new studio
	id := utils.GenerateID(8)
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

	c.WsEmit(rData)
	// c.WsEmit(&WsEv{
	// 	Event: "test",
	// 	Data:  WsData{},
	// })
}

// to join an existing room
func (c *Client) joinRoom(d *WsData) {
	roomID := (*d)["roomID"].(string)
	name := (*d)["name"].(string)
	email := (*d)["email"].(string)

	c.name = name
	c.email = email

	rData := &WsEv{
		Data: make(WsData),
	}

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

// to check the existence of a room
func (c *Client) checkRoom(d *WsData) {
	roomID := (*d)["roomID"].(string)
	studioID := (*d)["studioID"].(string)

	rData := &WsEv{
		Event: "room:checked",
		Data:  make(WsData),
	}

	c.hub.mu.Lock()
	studio, exists := c.hub.studios[roomID]
	if !exists || studio.name != studioID {
		rData.Data["exist"] = "false"
		c.hub.mu.Unlock()
		c.WsEmit(rData)
		return
	}
	c.hub.mu.Unlock()

	rData.Data["exist"] = "true"
	c.WsEmit(rData)
}
