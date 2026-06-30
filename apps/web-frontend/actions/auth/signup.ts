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