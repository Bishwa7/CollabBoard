import { middlewareHandler } from "./lib/authMiddleware";

export { middlewareHandler as proxy };

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};