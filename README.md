# Turborepo starter

This Turborepo starter is maintained by the Turborepo core team.

## Using this example

Run the following command:

```sh
npx create-turbo@latest
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `@repo/ui`: a stub React component library shared by both `web` and `docs` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended):

```sh
cd my-turborepo
turbo build
```

Without global `turbo`, use your package manager:

```sh
cd my-turborepo
npx turbo build
pnpm dlx turbo build
pnpm exec turbo build
```

You can build a specific package by using a [filter](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters):

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed:

```sh
turbo build --filter=docs
```

Without global `turbo`:

```sh
npx turbo build --filter=docs
pnpm exec turbo build --filter=docs
pnpm exec turbo build --filter=docs
```

### Develop

To develop all apps and packages, run the following command:

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended):

```sh
cd my-turborepo
turbo dev
```

Without global `turbo`, use your package manager:

```sh
cd my-turborepo
npx turbo dev
pnpm exec turbo dev
pnpm exec turbo dev
```

You can develop a specific package by using a [filter](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters):

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed:

```sh
turbo dev --filter=web
```

Without global `turbo`:

```sh
npx turbo dev --filter=web
pnpm exec turbo dev --filter=web
pnpm exec turbo dev --filter=web
```

### Remote Caching

> [!TIP]
> Vercel Remote Cache is free for all plans. Get started today at [vercel.com](https://vercel.com/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache).

Turborepo can use a technique known as [Remote Caching](https://turborepo.dev/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup?utm_source=turborepo-examples), then enter the following commands:

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended):

```sh
cd my-turborepo
turbo login
```

Without global `turbo`, use your package manager:

```sh
cd my-turborepo
npx turbo login
pnpm exec turbo login
pnpm exec turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed:

```sh
turbo link
```

Without global `turbo`:

```sh
npx turbo link
pnpm exec turbo link
pnpm exec turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turborepo.dev/docs/crafting-your-repository/running-tasks)
- [Caching](https://turborepo.dev/docs/crafting-your-repository/caching)
- [Remote Caching](https://turborepo.dev/docs/core-concepts/remote-caching)
- [Filtering](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters)
- [Configuration Options](https://turborepo.dev/docs/reference/configuration)
- [CLI Usage](https://turborepo.dev/docs/reference/command-line-reference)




<br/><br/><br/>

## Step 1 - 
- Initializing Turborepo

```sh
npx create-turbo@latest
cd CollabBoard
pnpm install
pnpm run dev
```

## Step 2 -
- create two Directories http-backend and ws-backend (./apps/http-backend & ./apps/ws-backend)
- and 

```sh
cd apps
mkdir http-backend
cd http-backend
npm init -y
```

```sh
cd apps
mkdir ws-backend
cd ws-backend
npm init -y
```

## Step 3 -
- create tsconfig.json file for ws-backend & http-backend and extend ./packages/typescript-config/base.json in them
-  add the @repo/typescript-config (./packages/typescript-config) as a dependency in the package,json for ws-backend and http-backend

```ssh
cd ws-backend
touch tsconfig.json

cd http-backend
touch tsconfig.json
```

- tsconfig.json (ws-backend & http-backend)
```json
{
    "extends": "@repo/typescript-config/base.json"
}
```

- package.json (ws-backend & http-backend)
```json
"dependencies": {
    "@repo/typescript-config" : "workspace:*"
  },
```

## Step 4 -
- Added a build, start & dev script for ws-backend & http-backend


package.json

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "tsc -b",
    "start": "node dist/index.js",
    "dev": "pnpm run build && pnpm run start"
  },
```

tsconfig.json

```json
"compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist"
}
```

## Step 5 - 
- Initializing a web socket (ws) server and http (express) server

```sh
mkdir ./apps/ws-backend/src
mkdir ./apps/http-backend/src

touch ./apps/ws-backend/src/index.ts
touch ./apps/http-backend/src/index.ts
```

- WS server
```sh
cd ./apps/ws-backend
pnpm add ws @types/ws
```
ws-backend/src/index.ts
```typescript
import { WebSocketServer } from "ws"
import http from "http"

const server = http.createServer()
const wss = new WebSocketServer({ server })

const PORT = process.env.PORT || 8080

server.listen(PORT , () => {
  console.log(` WS Server is running on PORT: ${PORT}`)
})

wss.on('connection', function connection(ws)=> {
  ws.on('error', console.error)

  ws.on('message', function message(data)=>{
    console.log('Message: %s', data )
    ws.send("Pong")
  })
})
```

- HTTP server
```sh
cd ./apps/http-backend
pnpm add express @types/express
```

http-backend/src/index.ts
```typescript
import express from "express"

const app = express()

app.get("/", (req,res) => {
  res.json({
    message: "Hello World"
  })
})

app.listen(3001, ()=>{
  console.log("HTTP Server is running on Port 3001")
})
```



## Step 6 - 
- Initialized project-level turbo.json to define the destination where turbo expects the outputs for project (eg: "dist/**")
- run "pnpm turbo run build --dry" for dry running build script and check the "outputs" for each project

root/turbo.json
```typescript
{
  "$schema": "https://turborepo.dev/schema.json",
  "ui": "tui",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "inputs": ["$TURBO_DEFAULT$", ".env*"]
    },
    "lint": {
      "dependsOn": ["^lint"]
    },
    "check-types": {
      "dependsOn": ["^check-types"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

http-backend/turbo.json
```json
{
  "extends": ["//"],
  "tasks": {
    "build": {
      "outputs": ["dist/**"]
    }
  }
}
```

ws-backend/turbo.json
```json
{
  "extends": ["//"],
  "tasks": {
    "build": {
      "outputs": ["dist/**"]
    }
  }
}
```

web/turbo.json
```json
{
  "extends": ["//"],
  "tasks": {
    "build": {
      "outputs": [".next/**", "!.next/cache/**", "!.next/dev/**"]
    }
  }
}
```

## Step 7 - 
- created a db package for common db with prisma7 (postgressql)

```ssh
mkdir packages/db

cd packages/db

pnpm init

touch tsconfig.json

pnpm add typescript tsx @types/node --save-dev

pnpm add prisma @types/pg --save-dev
pnpm add @prisma/client @prisma/adapter-pg pg dotenv
```

packages/db/tsconfig.json
```typescript
{
    "extends": "@repo/typescript-config/base.json",
    "compilerOptions": {
  
    // "rootDir": "./src",
    "outDir": "./dist",

    // "module": "esnext",
    // "moduleResolution": "bundler",
    // Try this if above not works --
    // "module": "nodenext",
    // "moduleResolution": "nodenext",


    // "target": "ES2023",
    
    // For nodejs:
    "lib": ["esnext"],
    "types": ["node"],
    // and npm install -D @types/node

    // Other Outputs
    // "sourceMap": true,
    "declaration": true,
    // "declarationMap": true,

    // Stricter Typechecking Options
    // "noUncheckedIndexedAccess": true,
    // "exactOptionalPropertyTypes": true,

    // Style Options
    // "noImplicitReturns": true,
    // "noImplicitOverride": true,
    // "noUnusedLocals": true,
    // "noUnusedParameters": true,
    // "noFallthroughCasesInSwitch": true,
    // "noPropertyAccessFromIndexSignature": true,

    // Recommended Options
    // "strict": true,
    // "jsx": "react-jsx",
    // "verbatimModuleSyntax": true,
    // "isolatedModules": true,
    // "noUncheckedSideEffectImports": true,
    // "moduleDetection": "force",
    // "skipLibCheck": true,

    // "esModuleInterop": true,
    // "ignoreDeprecations" : "6.0"
  },
  "include": ["src", "prisma/generated"]
}
```


packages/db/package.json
```typescript

{
  "name": "@repo/db",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "exports":{
    "./client":"./src/index.ts"
  },
  "scripts": {
    "db:test": "tsx src/index.ts",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev"
  },
  "devDependencies": {
    "@repo/typescript-config": "workspace:*",
    "@types/node": "^22.15.3",
    "@types/pg": "^8.20.0",
    "prisma": "^7.8.0",
    "tsx": "^4.22.4"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@prisma/adapter-pg": "^7.8.0",
    "@prisma/client": "^7.8.0",
    "dotenv": "^17.4.2",
    "pg": "^8.22.0"
  }
}

```

packages/db
```ssh
npx prisma init
```

- update packages/db/prisma.config.ts
```typescript
import "dotenv/config";
import { defineConfig } from "prisma/config";


const databaseUrl = process.env["DATABASE_URL"];

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not set in .env");
}


export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: databaseUrl,
  },
});
```

prisma/schema.prisma

- change output & define schema 

```prisma
generator client {
  provider = "prisma-client"
  output   = "./generated"
}

datasource db {
  provider = "postgresql"
}



model User {
  id        Int     @id @default(autoincrement())
  email     String  @unique
  username  String
  password  String
  photo     String

  rooms      Room[]
  chats      Chat[]
}

model Room {
  id        Int       @id @default(autoincrement())
  slug      String    @unique
  createdAt DateTime  @default(now())
  adminId   Int

  chats      Chat[]

  admin     User      @relation(fields: [adminId], references: [id])
}

model Chat {
  id        Int     @id @default(autoincrement())
  message   String
  roomId    Int
  userId    Int

  room      Room    @relation(fields: [roomId], references: [id])
  user      User    @relation(fields: [userId], references: [id])
}
```

```ssh
npx prisma migrate dev

npx prisma generate
```

src/client.ts
```typescript
import { PrismaClient } from "../prisma/generated/client.js"; 
import { PrismaPg } from "@prisma/adapter-pg"; 



const globalForPrisma = global as unknown as { prisma: PrismaClient; };

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL, 
}); 

export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter, });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma; 
// export default prisma; 
```

src/index.ts
```typescript
export * from './client.js';
```


packages/db/package.json

- added "exports:{ "./client": "./src/index.ts" }"

```typescript
{
  "name": "@repo/db",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "types": "./dist/src/index.d.ts",
  "exports": {
    "./client": "./dist/src/index.js"
  },
  "scripts": {
    "build": "tsc -b",
    "db:test": "tsx src/index.ts",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev"
  },
  "devDependencies": {
    "@repo/typescript-config": "workspace:*",
    "@types/node": "^22.15.3",
    "@types/pg": "^8.20.0",
    "prisma": "^7.8.0",
    "tsx": "^4.22.4"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "module",
  "dependencies": {
    "@prisma/adapter-pg": "^7.8.0",
    "@prisma/client": "^7.8.0",
    "dotenv": "^17.4.2",
    "pg": "^8.22.0",
  }
}

```


## Step 8 -
- Created packages/backend-common and packages/common packages
- For now the packages/backend-common consists of JWT helper
- For now the packages/common consists of ZOD schemas

<br/>

- packages/backend-common

```sh
mkdir packages/backend-common
cd packages/backend-common

pnpm init
touch tsconfig.json
```

backend-common/package.json

```typescript
{
  "name": "@repo/backend-common",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "tsc -b",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "devDependencies": {
    "@repo/typescript-config": "workspace:*"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@types/node": "^22.15.3"
  },
  "type": "module",
  "types": "./dist/index.d.ts",
  "exports": {
    "./config": {
      "types": "./dist/index.d.ts",
      "default": "./dist/index.js"
    }
  }
}
```

tsconfig.josn

```json
{
    "extends": "@repo/typescript-config/base.json",
    "compilerOptions": {
        "rootDir": "./src",
        "outDir": "./dist",
        "types": ["node"],
  }
}
```

src/jwt/jwtSecret.ts

```typescript
const jwt_secret = process.env.JWT_SECRET;

if(!jwt_secret){
    throw new Error("JWT Secret Missing")
}

export const JWT_SECRET: string = jwt_secret;
```

src/index.ts

```typescript
export * as secret from "./jwt/jwtSecret.js";
```


- packages/common

```sh
mkdir packages/common
cd packages/common

pnpm init
touch tsconfig.json
```

common/package.json

```typescript
{
  "name": "@repo/common",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    "./types": {
      "types": "./dist/index.d.ts",
      "default": "./dist/index.js"
    }
  },
  "scripts": {
    "build": "tsc -b"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@repo/typescript-config": "workspace:*"
  },
  "dependencies": {
    "zod": "^4.4.3"
  }
}

```

common/tsconfig.json

```json
{
    "extends": "@repo/typescript-config/base.json",
    "compilerOptions": {
        "rootDir": "./src",
        "outDir": "./dist",
        "declaration": true
    },
    "include": ["src"]
}
```

src/index.ts

```typescript
import {z} from "zod"

export const CreateUserSchema = z.object({
    email: z.email(),
    username: z.string().min(5).max(20),
    password: z.string().min(8).max(20)
    .regex(/[A-Z]/, {message: "Password must contain at least one UPPERCASE letter."})
    .regex(/[a-z]/, {message: "Passowd must contain at least one lowercase letter."})
    .regex(/[0-9]/, {message: "Password must contain at least one Number."})
    .regex(/[^A-Za-z0-9]/, {message: "Password must contain at least one Special Character."})
})


export const SigninSchema = z.object({
    email: z.email(),
    password: z.string().min(8).max(20)
    .regex(/[A-Z]/, {message: "Password must contain at least one UPPERCASE letter."})
    .regex(/[a-z]/, {message: "Passowd must contain at least one lowercase letter."})
    .regex(/[0-9]/, {message: "Password must contain at least one Number."})
    .regex(/[^A-Za-z0-9]/, {message: "Password must contain at least one Special Character."})
})


export const CreateRoomSchema = z.object({
    name: z.string().min(3).max(20)
})
```


## Step 9 -
- added SignUp and SignIn api endpoint in apps/http-backend for user
- added @repo/backend-common, @repo/common, @repo/db and other npm packages as dependencies/devDependencies for apps/http-backend


http-backend/package.json

```typescript
{
  "name": "http-backend",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "tsc -b",
    "start": "node dist/index.js",
    "dev": "pnpm run build && pnpm run start"
  },
  "dependencies": {
    "@repo/backend-common": "workspace:*",
    "@repo/common": "workspace:*",
    "@repo/db": "workspace:*",
    "@repo/typescript-config": "workspace:*",
    "@types/express": "^5.0.6",
    "bcrypt": "^6.0.0",
    "cors": "^2.8.6",
    "dotenv": "^17.4.2",
    "express": "^5.2.1",
    "jsonwebtoken": "^9.0.3"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "commonjs",
  "devDependencies": {
    "@types/bcrypt": "^6.0.0",
    "@types/cors": "^2.8.19",
    "@types/jsonwebtoken": "^9.0.10",
    "@types/node": "^22.15.3"
  }
}
```

http-backend/src/index.ts

```typescript
import "dotenv/config";
import express from "express"
import cors from "cors"
import userRouter from "./routes/user"
import { secret } from "@repo/backend-common/config";

const app = express()
app.use(express.json())
app.use(cors())


app.use("/api/v1/user", userRouter)


async function main(){

    app.listen(3001, ()=> {
        console.log("Http Server is running on port 3001")
    })
}

main().catch(err => console.log(err));
```

http-backend/src/routes/user.ts

```typescript
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
```


.env.example

```
DATABASE_URL="database://getADatabaseURL.com"
JWT_SECRET=SecretForJwtToken
```

## Step 10 -
- added userAuthMiddleware.ts
- created room/create api endpoint in http-backend to create chat/collab room (create room logic)


src/middlewares/userAuthMiddleware.ts
```typescript
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
```


src/routes/room.ts

```typescript
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


export default roomRouter;
```

src/index.ts

```typescript
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
```

## Step 11 - 
- added ws-backend logic for simple chat app (user can connect to multiple room to send and recieve real-time data/message)
- added http-backend api endpoint (chatRouter) to retrieve data/message stored in db (past data, limited to 50)


```sh
cd apps/ws-backend
pnpm add jsonwebtoken @types/jsonwebtoken dotenv
pnpm --filter ws-backend add @repo/db --workspace

cd ../..
pnpm install
```


ws-backend/src/index.ts

```typescript
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
```

ws-backend/.env.example
```
DATABASE_URL="database://getADatabaseURL.com"
JWT_SECRET=SecretForJwtToken
```

apps/http-backend/src/routes/chat.ts

```typescript
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
```

http-backend/src/index.ts

```typescript
import "dotenv/config";
import express from "express"
import cors from "cors"
import userRouter from "./routes/user"
import { secret } from "@repo/backend-common/config";
import roomRouter from "./routes/room";
import chatRouter from "./routes/chat";

const app = express()
app.use(express.json())
app.use(cors())


app.use("/api/v1/user", userRouter)
app.use("/api/v1/room", roomRouter)
app.use("/api/v1/chat", chatRouter)


async function main(){

    app.listen(3001, ()=> {
        console.log("Http Server is running on port 3001")
    })
}

main().catch(err => console.log(err));
```



# Frontend 

## Step 1 - 
- created a Nextjs project (web-frontend) for frontend and configured it.

```sh
cd apps/
npx create-next-app@latest
```

web-frontend/package.json

```typescript
{
  "name": "web-frontend",
  "version": "0.1.0",
  "type": "module",
  "private": true,
  "scripts": {
    "dev": "next dev --port 3030",
    "build": "next build",
    "start": "next start",
    "lint": "eslint --max-warnings 0",
    "check-types": "next typegen && tsc --noEmit"
  },
  "dependencies": {
    "@repo/ui": "workspace:*",
    "axios": "^1.18.1",
    "next": "16.2.9",
    "react": "^19.2.4",
    "react-dom": "^19.2.4"
  },
  "devDependencies": {
    "@repo/eslint-config": "workspace:*",
    "@repo/typescript-config": "workspace:*",
    "@types/node": "^22.15.3",
    "@types/react": "19.2.2",
    "@types/react-dom": "19.2.2",
    "eslint": "^9.39.1",
    "typescript": "5.9.2"
  }
}
```

web-frontend/tsconfig.json

```typescript
{
  "extends": "@repo/typescript-config/nextjs.json",
  "compilerOptions": {
    "plugins": [
      {
        "name": "next"
      }
    ],
    "strictNullChecks": true
  },
  "include": [
    "**/*.ts",
    "**/*.tsx",
    "next-env.d.ts",
    "next.config.js",
    ".next/types/**/*.ts"
  ],
  "exclude": ["node_modules"]
}

```

web-frontend/turbo.json

```typescript
{
  "extends": ["//"],
  "tasks": {
    "build": {
      "outputs": [".next/**", "!.next/cache/**", "!.next/dev/**"]
    }
  }
}
```


## Step 2 -
- Created SignUp and SignIn pages and connected to backend API endpoints
- created a new component in packages/ui (labelledInput.tsx)
- modified packages/ui/src/button.tsx

app/(pages)/(auth)/signin/page.tsx

```typescript
import AuthPage from "../../../../components/AuthPage";


export default function SignIn() {
    return (
        <AuthPage isSignin={true} />
    )
}
```

pp/(pages)/(auth)/signup/page.tsx

```typescript
import AuthPage from "../../../../components/AuthPage";

export default function SignUp() {
    return (
        <AuthPage isSignin={false} />
    )
}
```

components/AuthPage.tsx

```typescript
import { LabelledInput } from "@repo/ui/labelledInput";
import { Button } from "@repo/ui/button";
import { signin } from "../actions/auth/signin";
import { signup } from "../actions/auth/signup";


export default function AuthPage({isSignin}: {isSignin: boolean}) {
    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div className="block min-w-sm max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ">
                <div>
                    <div className="px-10">
                        <div className="text-3xl font-extrabold text-rose-300 flex justify-center">
                            {isSignin? "SIGN IN" : "SIGN UP"}
                        </div>
                    </div>
                    <div className="pt-2">
                        <form action={isSignin? signin: signup}>
                            <LabelledInput label="Email" placeholder="bishwanath@gmail.com" name="email" labelClassName="block mb-2 text-sm text-black font-semibold pt-4" inputClassName="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                            {isSignin? null : <LabelledInput label="Username" placeholder="bishwanath" name="username" labelClassName="block mb-2 text-sm text-black font-semibold pt-4" inputClassName="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />}
                            <LabelledInput label="Password" type={"password"} placeholder="123456" name="password" labelClassName="block mb-2 text-sm text-black font-semibold pt-4" inputClassName="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                            <Button className="mt-8 w-full text-white bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 cursor-pointer active:scale-95"> {isSignin? "Sign In" : "Sign Up"} </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

```

actions/auth/signin.ts

```typescript
"use server";

import axios from "axios";

export async function signin(formData: FormData){
    const email = formData.get("email")
    const password = formData.get("password")

    const response = await axios.post(`${process.env.BACKEND_URL}/api/v1/user/signin`,
        {
            email,
            password
        }
    )

    return response.data
}
```

actions/auth/signup.ts

```typescript
"use server";

import axios from "axios";

export async function signup(formData: FormData){
    const email = formData.get("email")
    const username = formData.get("username")
    const password = formData.get("password")
    
    const response = await axios.post(`${process.env.BACKEND_URL}/api/v1/user/signup`,
        {
            email,
            username,
            password
        }
    )

    return response.data
}
```

.env.example

```
BACKEND_URL=http://localhost:8080
```


packages/ui/src/labelledInput.tsx

```typescript


interface LabelledInputType {
    label: string;
    placeholder: string;
    type?: string;
    labelClassName?: string;
    inputClassName?: string;
    name?: string;
}

export function LabelledInput({ label, placeholder, type, labelClassName, inputClassName, name }: LabelledInputType) {
    return <div>
        <label className={labelClassName}>{label}</label>
        <input name={name} type={type || "text"} id="first_name" className={inputClassName} placeholder={placeholder} required />
    </div>
}
```


packages/ui/src/button.tsx

```typescript
// "use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
}

export const Button = ({ children, className }: ButtonProps) => {
  return (
    <button
      className={className}
      type="submit"
    >
      {children}
    </button>
  );
};

```


## Step 3 - 
- added web-frontend/app/(pages)/canvas/[ roomId], canvas page (the page where the users ca draw)
- added web-frontend/draw/index.ts, with initDraw() having the logic to draw rectangle shape, which is called is canvas page


web-frontend/app/(pages)/canvas/[ roomId]

```typescript
"use client";

import { useEffect, useRef } from "react";
import { initDraw } from "../../../../draw";

export default function Canvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const cleanUp = initDraw(canvas)


        return ()=> {
            if(typeof cleanUp === "function"){
                cleanUp()
            }
        }
    }, []);

    return (
        <canvas ref={canvasRef} className="w-screen h-screen border border-gray-500 bg-black" />
    );
}
```


web-frontend/draw/index.ts

```typescript
export function initDraw(canvas: HTMLCanvasElement){
    // canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let isDrawing = false;
    let startX = 0;
    let startY = 0;

    function getMousePos(e: MouseEvent, canvas: HTMLCanvasElement) {
        const rect = canvas.getBoundingClientRect();

        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };
    }

    const handleMouseDown = (e: MouseEvent) => {
        isDrawing = true;

        const { x, y } = getMousePos(e, canvas);

        startX = x;
        startY = y;
    };

    const handleMouseUp = () => {
        isDrawing = false;
    };

    const handleMouseLeave = () => {
        isDrawing = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDrawing) return;

        const { x, y } = getMousePos(e, canvas);

        const width = x - startX;
        const height = y - startY;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.strokeRect(startX, startY, width, height);
    };


    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
        canvas.removeEventListener("mousedown", handleMouseDown);
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mouseup", handleMouseUp);
        canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
}
```


