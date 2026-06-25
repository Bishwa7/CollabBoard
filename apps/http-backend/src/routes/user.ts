import { Router } from "express";
import {CreateUserSchema, SigninSchema} from "@repo/common/types"
import bcrypt from "bcrypt"
import { prisma } from "@repo/db/client"
import jwt from "jsonwebtoken"
import { secret } from "@repo/backend-common/config";

const userRouter : Router = Router();




userRouter.post("/signup", async (req, res)=> {

    const parsedData = CreateUserSchema.safeParse(req.body)

    if(!parsedData.success){
        res.status(400).json({
            message: "Invalid Input Format",
            error: parsedData.error
        })
        return;
    }

    const { email,username,password} = parsedData.data;

    try {
        const existingUser = await prisma.user.findFirst({
            where:{
                email
            }
        })

        if(existingUser){
            res.status(403).json({
                message: "Email Already Exists"
            })
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await prisma.user.create({
            data: {
                email: email,
                username: username,
                password: hashedPassword
            }
        })


        res.status(200).json({
            message: "You are signed up",
            user: {
                email: user.email,
                username: user.username
            }
        })
    }
    catch(err){
        console.error(err)


        res.status(400).json({
            message: "Error in SignUp api endpoint",
            error: err
        })
    }
})





userRouter.post("/signin", async (req, res)=> {

    const parsedData = SigninSchema.safeParse(req.body)

    if(!parsedData.success){
        res.status(400).json({
            message: "Invalid Input Format",
            error: parsedData.error
        })
        return;
    }

    const { email, password } = parsedData.data;

    try{

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if(!user){
            res.status(400).json({
                message: "Invalid Credentials"
            })
            return;
        }

        const isValidPassword = await bcrypt.compare(password, user.password)

        if(!isValidPassword){
            res.status(400).json({
                message: "Invalid Credentials"
            })
            return;
        }

        const token = jwt.sign({id: user.id}, secret.JWT_SECRET!)

        res.status(200).json({
            message: "Logged In Succesfully",
            token: token
        })
    }
    catch(err){
        console.error(err)

        res.status(400).json({
            message: "Error in SignIn api endpoint",
            error: err
        })
    }
})



export default userRouter;