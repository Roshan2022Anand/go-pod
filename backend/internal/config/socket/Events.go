package socket

import (
	"encoding/json"
	"fmt"
	"server/internal/utils"
)

type create struct {
	Name  string `json:"name"`
	Email string `json:"email"`
}
type join struct {
	RoomID string `json:"roomId"`
	Name   string `json:"name"`
	Email  string `json:"email"`
}

// to create a room
func (h *Hub) createRoom(c *Client, d []byte) {
	var data create
	if err := json.Unmarshal(d, &data); err != nil {
		fmt.Println("err while unmarshaling event data:", err)
		return
	}

	fmt.Println("creating room for ", data.Name)

	//creating a room inside the hub
	id := utils.GenerateID(12)
	h.rooms[id] = &Room{
		Clients: map[*Client]bool{
			c: true,
		},
	}

	rData := map[string]interface{}{
		"event": "room:created",
		"data": map[string]interface{}{
			"roomID": id,
		},
	}

	//convert rData to byte
	rDataByte, err := json.Marshal(rData)
	if err != nil {
		fmt.Println("err while marshaling event data:", err)
		return
	}
	c.send <- rDataByte
}

// to join a room
func (h *Hub) joinRoom(c *Client, d []byte) {
	var data join
	if err := json.Unmarshal(d, &data); err != nil {
		fmt.Println("err while unmarshaling event data:", err)
		return
	}


	rData := make(map[string]interface{})
	if room, ok := h.rooms[data.RoomID]; ok {
		room.Clients[c] = true
		rData["event"] = "room:joined"
		rData["data"] = map[string]interface{}{
			"roomID": data.RoomID,
		}
	} else {
		rData["event"] = "error"
		rData["data"] = map[string]interface{}{
			"message": "room not found",
		}
	}

	fmt.Println(h.rooms)

	//convert rData to byte
	rDataByte, err := json.Marshal(rData)
	if err != nil {
		fmt.Println("err while marshaling event data:", err)
		return
	}
	c.send <- rDataByte
}
