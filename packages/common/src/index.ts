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