"use server";

import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signin(formData: FormData){
    const email = formData.get("email")
    const password = formData.get("password")

    const response = await axios.post(`${process.env.BACKEND_URL}/api/v1/user/signin`,
        {
            email,
            password
        }
    )
    const token = response.data.token;

    (await cookies()).set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        // optional: expires/maxAge
        maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    redirect("/lobby")
}