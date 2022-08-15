const WebSocket = require("ws");
const express = require("express");

const app = express();
const port = process.env.PORT || 8080;
const wss = new WebSocket.Server({ port });

app.get("/", (req, res) => {
  res.send(`WebSocketServer is working on port ${port}`);
});

wss.on("connection", (client) => {
  console.log(`WebSocketServer is working on port ${port}`);
  client.on("message", (message, isBinary) => {
    [...wss.clients]
      .filter((c) => c !== client)
      .forEach((c) => c.send(isBinary ? message.toString() : message));
  });
});
