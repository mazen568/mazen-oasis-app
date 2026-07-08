import NextAuth, { type NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

export const authConfig :NextAuthConfig = {
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID!,
            clientSecret: process.env.AUTH_GOOGLE_SECRET!
        })
    ]
}

export const { auth, handlers: {
    GET, POST
} } = NextAuth(authConfig);