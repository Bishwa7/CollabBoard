import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { secret } from "@repo/backend-common/config";

const publicRoutes = [
    "/",
    "/signin",
    "/signup",
    "/about",
    "/pricing",
    "/contact",
];

export function middlewareHandler(request: NextRequest) {


    const { pathname } = request.nextUrl;

    // Allow public routes
    if (publicRoutes.includes(pathname)) {
        return NextResponse.next();
    }

    const token = request.cookies.get("token")?.value;

    if (!token) {
        return NextResponse.redirect(new URL("/signin", request.url));
    }

    try {
        jwt.verify(token, secret.JWT_SECRET);
        return NextResponse.next();
    } catch {
        return NextResponse.redirect(new URL("/signin", request.url));
    }

}