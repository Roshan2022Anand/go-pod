package socket

import (
	"encoding/json"
	"fmt"

	"github.com/Roshan-anand/go-pod/internal/utils"
	"github.com/pion/webrtc/v4"
)

// configuration for webrtc
// contains the STUN server used for NAT traversal
// and the ICE candidate pool size
var config = webrtc.Configuration{
	ICEServers: []webrtc.ICEServer{
		{
			URLs: []string{"stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"},
		},
	},
	ICECandidatePoolSize: 10,
}

// to handle sdp offer
func (c *Client) offer(d *WsData) {
	rErrData := &WsEv{
		Event: "error:rtc",
		Data:  WsData{},
	}

	sdp, err := utils.DecompressD((*d)["sdp"]) //decompress the sdp data
	if err != nil {
		fmt.Println("error while decompressing sdp:", err)
		rErrData.Data["msg"] = "Corrupted sdp data"
		c.WsEmit(rErrData)
		return
	}

	peerC, err := webrtc.NewPeerConnection(config) // making a new peer connection
	if err != nil {
		rErrData.Data["msg"] = "Failed to create peer connection"
		c.WsEmit(rErrData)
		return
	}
	c.peerC = peerC

	//handle connection state
	peerC.OnConnectionStateChange(func(s webrtc.PeerConnectionState) {
		if s == webrtc.PeerConnectionStateClosed || s == webrtc.PeerConnectionStateFailed {
			fmt.Println("peer connection closed or failed")
		}
	})

	// on ICE candidate gathering
	peerC.OnICECandidate(func(i *webrtc.ICECandidate) {
		if i == nil {
			fmt.Println("ICE candidate gathering complete")
			return
		}

		ice, err := json.Marshal(i.ToJSON())
		if err != nil {
			fmt.Println("error while marshalling ICE candidate:", err)
			return
		}

		c.WsEmit(&WsEv{
			Event: "ice",
			Data: WsData{
				"ice": string(ice),
			},
		})
	})

	// handeling incomming tracks
	peerC.OnTrack(func(track *webrtc.TrackRemote, receiver *webrtc.RTPReceiver) {
		fmt.Printf("Got remote track: %s, SSRC=%d\n", track.Kind(), track.SSRC())
	})

	//setting up remote description
	err = peerC.SetRemoteDescription(webrtc.SessionDescription{
		Type: webrtc.SDPTypeOffer,
		SDP:  sdp,
	})
	if err != nil {
		fmt.Println("error while setting remote description:", err)
		rErrData.Data["msg"] = "Failed to set remote description"
		c.WsEmit(rErrData)
		return
	}

	//creating an answer
	ans, err := peerC.CreateAnswer(nil)
	if err != nil {
		fmt.Println("error while creating answer:", err)
		rErrData.Data["msg"] = "Failed to create answer"
		c.WsEmit(rErrData)
		return
	}
	err = peerC.SetLocalDescription(ans) //set the local description
	if err != nil {
		fmt.Println("error while setting local description:", err)
		rErrData.Data["msg"] = "Failed to set local description"
		c.WsEmit(rErrData)
		return
	}

	//compress the answer sdp
	sdp, err = utils.CompressD(&ans.SDP)
	if err != nil {
		fmt.Println("error while compressing sdp:", err)
		rErrData.Data["msg"] = "Failed to compress answer sdp"
		c.WsEmit(rErrData)
		return
	}

	c.WsEmit(&WsEv{
		Event: "sdp:answer",
		Data: WsData{
			"sdp": sdp,
		},
	})
}

// to handle ICE candidates
func (c *Client) ice(d *WsData) {
	c.hub.mu.Lock()
	defer c.hub.mu.Unlock()

	ice := (*d)["ice"]
	var candid webrtc.ICECandidateInit
	err := json.Unmarshal([]byte(ice), &candid)
	if err != nil {
		fmt.Println("error while unmarshalling ICE candidate:", err)
	}

	err = c.peerC.AddICECandidate(candid)
	if err != nil {
		fmt.Println("error while adding ICE candidate:", err)
	}
}
