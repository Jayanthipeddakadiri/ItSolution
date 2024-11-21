import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const publicPaths = ["/Login", "/signup"];

  // Check if the current path is public
  const isPublicPath = publicPaths.includes(path);

  const token = request.cookies.get("token")?.value || "";
  console.log("is public path", isPublicPath);
  if (isPublicPath && token) {
    console.log("signup triggering");
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/Login", request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/Login", "/register", "/admin"],
};
