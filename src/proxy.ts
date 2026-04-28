import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  console.log("MIDDLEWARE TOKEN:", token);

  const isAuthenticated = !!token;

  if (!isAuthenticated) {
    return NextResponse.redirect(
      new URL("/auth/register", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/cart", "/allorders"],
};