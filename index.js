import { WebSocketServer } from "ws";
import express from "express";

const app = express();
const PORT = process.env.PORT || 8080;
const wss = new WebSocketServer({ port: PORT });

app.get("/", (req, res) => {
  res.send(`WebSocketServer is working on port ${PORT}`);
});

wss.on("connection", (client) => {
  client.on("message", (message, isBinary) => {
    [...wss.clients]
      .filter((c) => c !== client)
      .forEach((c) => c.send(isBinary ? message.toString() : message));
  });
});
