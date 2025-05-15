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

	//creating a room inside the hub
	id := utils.GenerateID(14)
	h.rooms[id] = &Room{
		Clients: map[*Client]bool{
			c: true,
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
	rData := &WsEvent{
		Data: map[string]string{},
	}

	//check if the room exists
	if room, ok := h.rooms[ev.Data["roomID"]]; ok {
		c.name = ev.Data["name"]
		room.Clients[c] = true
		rData.Event = "room:joined"
		rData.Data["roomId"] = ev.Data["roomID"]
	} else {
		rData.Event = "error"
		rData.Data["msg"] = "room not found"
	}

	sendEv(c, rData)
}

// to offer rtc connection with room members
func (h *Hub) offerConn(c *Client, ev *WsEvent) {

	rData := &WsEvent{
		Event: "recived:offer",
		Data: map[string]string{
			"sdp": ev.Data["sdp"],
		},
	}

	for client := range h.rooms[ev.Data["roomId"]].Clients {
		if client != c {
			sendEv(client, rData)
		}
	}

}
