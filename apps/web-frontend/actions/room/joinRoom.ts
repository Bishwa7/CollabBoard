"use server";

import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function joinRoom(prevState: { error: string | null }, formData: FormData) {
    const roomId = formData.get("room");


    const token = (await cookies()).get("token")?.value;

    if (!token) {
        redirect("/signin");
    }

    try {
        await axios.get(
            `${process.env.BACKEND_URL}/api/v1/room/${roomId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        
    } catch(err) {
        console.log(err);

        if (axios.isAxiosError(err)) {
            console.log(err.response?.status);
            console.log(err.response?.data);

            return {
                error: err.response?.data?.message ?? "Something went wrong",
            };
        }

        return {
            error: "Something went wrong",
        };
    }


    redirect(`/canvas/${roomId}`);
}