package socket

import (
	"encoding/json"
	"fmt"
	"server/internal/utils"
)

// to send the event to the client
func sendEv(c *Client, ev *WsEvent) {
	rDataByte, err := json.Marshal(*ev)
	if err != nil {
		fmt.Println("err while marshaling event data:", err)
		return
	}
	c.send <- rDataByte
}

// to create a room
func (h *Hub) createRoom(c *Client, ev *WsEvent) {

	c.name = ev.Data["name"]
	c.email = ev.Data["email"]
	c.roomID = ev.Data["roomID"]

	//creating a room inside the hub
	id := utils.GenerateID(14)
	h.rooms[id] = &Room{
		Clients: map[string]*Client{
			ev.Data["email"]: c,
		},
	}

	//return event
	rData := &WsEvent{
		Event: "room:created",
		Data: map[string]string{
			"roomId": id,
		},
	}

	sendEv(c, rData)
}

// to join a room
func (h *Hub) joinRoom(c *Client, ev *WsEvent) {
	rData1 := &WsEvent{
		Data: map[string]string{},
	}
	rData2 := &WsEvent{
		Data: map[string]string{},
	}

	//check if the room exists
	if room, ok := h.rooms[ev.Data["roomID"]]; ok {

		//inform all the clients in the room
		for _, client := range room.Clients {
			rData2.Event = "room:newclient"
			rData2.Data["name"] = ev.Data["name"]
			rData2.Data["email"] = ev.Data["email"]
			sendEv(client, rData2)
		}

		//add clietn to the room
		c.name = ev.Data["name"]
		c.email = ev.Data["email"]
		c.roomID = ev.Data["roomID"]
		room.Clients["email"] = c
		rData1.Event = "room:joined"
		rData1.Data["roomId"] = ev.Data["roomID"]
	} else {
		rData1.Event = "error"
		rData1.Data["msg"] = "room not found"
	}

	sendEv(c, rData1)
}

func (h *Hub) offerConn(c *Client, ev *WsEvent) {

}
