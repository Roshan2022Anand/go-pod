import { useMyContext } from "./utils/Mycontext";

const App = () => {
  const { isSocketReady, sendMsg, connectSocket } = useMyContext();
  connectSocket();
  return (
    <>
      <button
        className="text-[20px] bg-green-300 rounded-lg disabled:bg-gray-300"
        onClick={sendMsg}
        disabled={!isSocketReady}
      >
        {isSocketReady ? "Create Room" : "Connecting..."}
      </button>
      <div className="text-sm mt-2">
        Status: {isSocketReady ? "🟢 Connected" : "🔴 Connecting"}
      </div>
    </>
  );
};

export default App;
