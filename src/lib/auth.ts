/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth, { type NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

export const authConfig: NextAuthConfig = {
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID!,
            clientSecret: process.env.AUTH_GOOGLE_SECRET!
        })
    ],
    callbacks: {
        authorized({ auth, request }) {
            return !!auth;
        }
    },
    pages: {
        signIn: "/login"
    }
}

export const {
     auth, 
     signIn, 
     signOut, 
     handlers: {
    GET, POST
} } = NextAuth(authConfig);