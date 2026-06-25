import "dotenv/config";
import express from "express"
import cors from "cors"
import userRouter from "./routes/user"
import { secret } from "@repo/backend-common/config";
import roomRouter from "./routes/room";

const app = express()
app.use(express.json())
app.use(cors())


app.use("/api/v1/user", userRouter)
app.use("/api/v1/room", roomRouter)


async function main(){

    app.listen(3001, ()=> {
        console.log("Http Server is running on port 3001")
    })
}

main().catch(err => console.log(err));