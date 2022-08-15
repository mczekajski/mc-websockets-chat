const WebSocket = require("ws");

const port = process.env.PORT || 80;
const wss = new WebSocket.Server({ port });

wss.on("connection", (client) => {
  client.onopen = () => {
    client.send(
      JSON.stringify({
        message: "Welcome to the chat. Type below to begin a conversation...",
      })
    );
  };
  client.on("message", (message, isBinary) => {
    [...wss.clients]
      .filter((c) => c !== client)
      .forEach((c) => c.send(isBinary ? message.toString() : message));
  });
});
