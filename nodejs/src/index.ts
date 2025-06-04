import express from "express";
import { createServer } from "http";
import cors from "cors";
import { env } from "process";
import dotenv from "dotenv";
import { initSocket } from "./config/socket";
import authRouter from "./routes/auth";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const server = createServer(app);
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, 
  })
);

initSocket(server); //initialize the websocket
app.use("/auth", authRouter); //auth routes

app.get("/", (req, res) => {
  res.status(200).json({ msg: "welcome to node server" });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log("server is runinng on port", PORT);
  console.log("frontend url is", process.env.FRONTEND_URL);
});
