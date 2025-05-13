package socket

import (
	"encoding/json"
	"fmt"
)

type create struct {
	Name  string `json:"name"`
	Email string `json:"email"`
}

func createRoom(c *Client, d []byte) {
	var data create
	if err := json.Unmarshal(d, &data); err != nil {
		fmt.Println("err while unmarshaling event data:", err)
		return
	}

	fmt.Println("creating room for ", data.Name)

	rData := map[string]interface{}{
		"event": "room:created",
		"data": map[string]interface{}{
			"roomID": "123",
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
