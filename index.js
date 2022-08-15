const WebSocket = require("ws");
const express = require("express");

const app = express();
const PORT = 8080;
const wss = new WebSocket.Server({ port: PORT });

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
