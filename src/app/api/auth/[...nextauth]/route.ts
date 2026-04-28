
import apiServices from "@/services/api";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions:NextAuthOptions  = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const res = await apiServices.signIn(
          credentials!.email,
          credentials!.password
        );

        if (res.message === "success") {
        const user=  {
            id: res.user.email,
            email: res.user.email,
            name: res.user.name,
            role: res.user.role,
            token: res.token,
          };
          return user
        }

        return null;
      },
    }),
  ],

  pages: {
    signIn: "/auth/login",
  },

  callbacks: {
    async jwt({ token, user }) {
  if (user) {
    token.token = user.token;
    token.role = user.role;
  }
  return token;
},

async session({ session, token }) {
  if (session.user) {
    session.user.role = token.role;
    session.user.token = token.token;
  }
  return session;
}
  },

  secret: process.env.AUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };








