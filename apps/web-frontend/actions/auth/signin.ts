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