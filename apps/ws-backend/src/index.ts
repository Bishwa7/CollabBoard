import { WebSocketServer } from "ws"
import http from "http"

const server = http.createServer()
const wss = new WebSocketServer({ server })


const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log("Server running on port", PORT);
});


wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data) {
    
    console.log('received: %s', data);
    ws.send('Pong');
  });

});