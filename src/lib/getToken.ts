import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function getAuthToken() {
  // ✅ SERVER SIDE
  if (typeof window === "undefined") {
    const session = await getServerSession(authOptions);
    return session?.user?.token;
  }

  // ✅ CLIENT SIDE
  const session = await getSession();
  return session?.user?.token;
}