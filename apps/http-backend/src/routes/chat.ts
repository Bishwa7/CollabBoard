import { prisma } from "@repo/db/client";
import { Router } from "express";
import { userAuthMiddleware } from "../middlewares/userAuthMiddleware";

const chatRouter: Router = Router();


chatRouter.get("/:roomId", userAuthMiddleware, async (req, res) => {
    try{
        const roomId = Number(req.params.roomId)

        const messages = await prisma.chat.findMany({
            where: {
                roomId: roomId
            },
            orderBy: {
                id: "desc"
            },
            take: 50
        })

        res.status(200).json({
            messages
        })
    }
    catch(err){
        console.error(err)
        res.status(400).json({
            message: "Error on retrieving chats",
            error: err
        })
    }
    
})


export default chatRouter;