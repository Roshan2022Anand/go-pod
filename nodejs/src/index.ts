import express from "express";
import { createServer } from "http";
import cors from "cors";
import { env } from "process";
import dotenv from "dotenv";
import { initSocket } from "./config/socket";

dotenv.config();

const app = express();
const server = createServer(app);
app.use(express.json());

app.use(
  cors({
    origin: env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

initSocket(server); //initialize the websocket

const PORT = env.PORT || 5000;
server.listen(PORT, () => {
  console.log("server is runinng on port", PORT);
});
