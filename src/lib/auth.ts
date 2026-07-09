/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth, { type NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

export const authConfig: NextAuthConfig = {
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID!,
            clientSecret: process.env.AUTH_GOOGLE_SECRET!
        })
    ],
    callbacks: {
        authorized({ auth, request }) {
            console.log("AUTHORIZED:", auth);

            return !!auth;
        },
        async signIn({ user, account, profile }) {
            console.log("SIGN IN CALLBACK:", user);

            try {
                if (!user.email)
                    return false;
                const existingUser = await getGuest(user.email);
                if (!existingUser) {
                    await createGuest({ email: user.email, full_name: user.name })
                }
                return true;
            } catch {
                return false;
            }

        },
        async session({ session }) {

            const guest = await getGuest(session.user.email);// or
            
            session.user.id = String(guest?.id);

            return session;

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