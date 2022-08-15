import { WebSocketServer } from "ws";

const PORT = process.env.PORT || 8080;

const wss = new WebSocketServer({ PORT });

wss.on("connection", (client) => {
  client.on("message", (message, isBinary) => {
    [...wss.clients]
      .filter((c) => c !== client)
      .forEach((c) => c.send(isBinary ? message.toString() : message));
  });
});
