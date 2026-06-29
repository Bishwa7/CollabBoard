import "dotenv/config";
import { WebSocket, WebSocketServer } from "ws"
import http from "http"
import jwt from "jsonwebtoken"
import { secret } from "@repo/backend-common/config";
import { prisma } from "@repo/db/client";

const server = http.createServer()
const wss = new WebSocketServer({ server })


const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log("Server running on port", PORT);
});


interface User {
  ws: WebSocket,
  rooms: Set<number>,
  userId: number;
}

const users: User[] =  []


function checkUser(token: string): number | null {
  try{
    const decoded = jwt.verify(token, secret.JWT_SECRET)

    if(typeof decoded == "string") {
      return null;
    }

    return decoded.id ?? null;
  }
  catch(err){
    console.error(err)
    return null
  }
}


wss.on('connection', function connection(ws, request) {
  ws.on('error', (err)=> {
    console.error("WebSocket error: ", err)
  });

  const url = request.url;
  if(!url){ return }

  const queryParams = new URLSearchParams(url.split('?')[1])
  const token = queryParams.get('token') || "";

  // const parsedUrl = new URL(url, `ws://${request.headers.host}`);
  // const token = parsedUrl.searchParams.get("token") ?? "";
  const userId = checkUser(token)

  if(!userId){
    ws.close();
    return;
  }

  const user: User = {
    userId,
    rooms: new Set(),
    ws
  }

  users.push( user )

  ws.on("close", ()=> {
    const index = users.indexOf(user)

    if(index !== -1 ){
      users.splice(index, 1)
    }

    console.log(`User: ${user.userId}, disconnected` )
  })

  

  ws.on('message', async (data, isBinary) => {
    if (isBinary) {
        ws.close(1003, "Binary messages are not supported");
        return;
    }

    const message = data.toString();

    let parsedData;

    try{
      parsedData = JSON.parse(message)

      if(typeof parsedData.type !== "string" || typeof parsedData.roomId !== "number"){
        ws.send(
          JSON.stringify({
            type: "error",
            message: "Invalid Data format"
          })
        )
        return;
      }
    }
    catch{
      ws.send(
        JSON.stringify({
          type: "error",
          message: "Invalid JSON"
        })
      )
      return;
    }
    
    if(parsedData.type === "join_room"){
      // const user = users.find((u)=> u.ws === ws)

      // if(!user){
      //   ws.close()
      //   return;
      // }

      if (user.rooms.has(parsedData.roomId)){
        ws.send(
          JSON.stringify({
            type: "error",
            message: "User Already in this room"
          })
        )
        return;
      }

      try{
        const room = await prisma.room.findUnique({
          where:{
            id: parsedData.roomId
          }
        })

        if(!room){
          ws.send(
            JSON.stringify({
              type: "error",
              message: "Room does not exist"
            })
          )
          return;
        }

        user.rooms.add(parsedData.roomId)

        ws.send(
          JSON.stringify({
            type: "join_room_success",
            roomId: parsedData.roomId
          })
        )
      }
      catch(err){
        console.error(err)

        ws.send(
          JSON.stringify({
            type: "error",
            message: "Error in db query during join_room"
          })
        )
      }
    }

    if(parsedData.type === "leave_room"){
      // const user = users.find((u)=> u.ws === ws)

      // if(!user){
      //   ws.close()
      //   return;
      // }
      
      const removed = user.rooms.delete(parsedData.roomId)

      if (!removed) {
        ws.send(
          JSON.stringify({
            type: "error",
            message: "User is not in this room"
          })
        );
        return;
      }

      ws.send(
        JSON.stringify({
          type: "leave_room_success",
          roomId: parsedData.roomId
        })
      );
    }


    if(parsedData.type === "chat"){
      const roomId = parsedData.roomId;
      const message = parsedData.message;

      if (!user.rooms.has(roomId)) {
        ws.send(
          JSON.stringify({
            type: "error",
            message: "You are not a member of this room"
          })
        );
        return;
      }

      await prisma.chat.create({
        data: {
          message,
          roomId,
          userId
        }
      })

      users.forEach((connectedUser) => {
        if(connectedUser.rooms.has(roomId)){
          connectedUser.ws.send(
            JSON.stringify({
              type: "chat",
              message: message,
              roomId,
              userId
            })
          )
        }
      })
    }
    

  });



});