import { Room, VideoPresets } from "livekit-client";
const room = new Room({
  adaptiveStream: true,
  dynacast: true,

  videoCaptureDefaults: {
    resolution: VideoPresets.h720.resolution,
  },
});
