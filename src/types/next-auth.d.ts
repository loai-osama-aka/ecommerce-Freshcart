import  { DefaultSession } from "next-auth"

declare module "next-auth" {
    /**
   
     */
    interface Session {
        user: {
            /** The user's postal address. */
            role?: string
            token?: string
        } & DefaultSession["user"]
    }

    interface User{
        token:string,
        role?:string
    }
}

declare module "next-auth/jwt"{
    interface JWT{
        token?:string,
        role?:string

    }
}