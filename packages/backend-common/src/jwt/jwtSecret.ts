const jwt_secret = process.env.JWT_SECRET;

if(!jwt_secret){
    throw new Error("JWT Secret Missing")
}

export const JWT_SECRET: string = jwt_secret;