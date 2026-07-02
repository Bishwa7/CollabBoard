"use server";

import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function createRoom(formData: FormData) {
    const name = formData.get("name");

    const token = (await cookies()).get("token")?.value;

    if (!token) {
        redirect("/signin");
    }

    const response = await axios.post(
        `${process.env.BACKEND_URL}/api/v1/room/create`,
        {
            name,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const roomId = response.data.roomId;

    redirect(`/canvas/${roomId}`);
}