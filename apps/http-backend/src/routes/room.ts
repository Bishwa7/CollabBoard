declare global{
    namespace Express{
        export interface Request{
            userId:number;
        }
    }
}


import { CreateRoomSchema } from "@repo/common/types";
import { Router } from "express";
import { userAuthMiddleware } from "../middlewares/userAuthMiddleware";
import { prisma } from "@repo/db/client";


const roomRouter: Router = Router();


roomRouter.post("/create", userAuthMiddleware, async (req, res) => {

    try{
        const parsedData = CreateRoomSchema.safeParse(req.body)

        if(!parsedData.success){
            return res.status(400).json({
                message: "Invalid create room data",
                error: parsedData.error
            })
        }

        const userId = req.userId

        const room = await prisma.room.create({
            data:{
                slug: parsedData.data.name,
                adminId: userId
            }
        })

        res.status(200).json({
            message: "Chat Room created successfully",
            roomId: room.id
        })
    }
    catch(err){
        console.error(err);

        res.status(400).json({
            message: "Error while creating room",
            message2: "Duplicate Room name, name needs to be unique",
            error: err
        })
    }    

})




roomRouter.get("/:roomId", userAuthMiddleware, async (req, res) => {
    try{
        const roomId = Number(req.params.roomId);

        const room = await prisma.room.findUnique({
            where: {
                id: roomId,
            },
        });

        if (!room) {
            return res.status(404).json({
                message: "Room not found",
            });
        }

        res.status(200).json({
            room,
        });
    }
    catch(err){
        console.error(err)
        res.status(404).json({
            message: "Error in checkin room if exists api endpoit",
            error: err
        })
    }
});

export default roomRouter;