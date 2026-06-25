import jwt from "jsonwebtoken"
import type { NextFunction, Request, Response } from "express"
import { secret } from "@repo/backend-common/config"


export const userAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const authHeader = req.headers["authorization"]

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(400).json({
            message: "Authorization header is missing or malformed"
        })
    }

    const token = authHeader.split(" ")[1];

    if(!token){
        return res.status(400).json({
            message: "Authorization header is missing or malformed"
        })
    }

    try{
        const decoded = jwt.verify(token, secret.JWT_SECRET) as {id?:number}

        if(!decoded.id){
            return res.status(400).json({
                message: "Invalid Token Payload"
            })
        }

        // req.userId declared in routes/room.ts as this middleware is used there
        req.userId = decoded.id
        next();
    }
    catch(err){
        console.error(err)
        return res.status(400).json({
            message: "Error in user auth middleware",
            message2: "Invalid or expired token"
        })
    }
}