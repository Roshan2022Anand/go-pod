import { useContext } from "react";
import connectSocket from "./configs/socket";
import { MyContext } from "./utils/Mycontext";

const App = () => {
  //to connect to the socket server
  const { setSocket } = useContext(MyContext);
  const socket = connectSocket();
  setSocket(socket);

  return <div>App</div>;
};

export default App;
