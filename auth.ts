import NextAuth from "next-auth"
import Twitter from 'next-auth/providers/twitter';
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { drizzleClientHttp as db } from "./db/drizzle.server";

import {
  Profile,
  Session,
  User,
} from "@auth/core/types"

// https://next-auth.js.org/configuration/initialization#advanced-initialization
 
export const { auth, handlers, signIn, signOut } = NextAuth({
    debug: true,
    adapter: DrizzleAdapter(db),
    providers: [Twitter],
    // ({
        // clientId: process.env.AUTH_TWITTER_ID as string,
        // clientSecret: process.env.AUTH_TWITTER_SECRET as string,
    // })
    // note required https://authjs.dev/getting-started/migrating-to-v5#authenticating-server-side
    session: {},
    secret: process.env.AUTH_SECRET as string,
    callbacks: {
        async signIn(props) {
            try {
                console.log('NextAuth signIn callback')
                console.log('------ props ------')
                console.log(props)
                return true
            } catch (e) {
                console.log(e);
                return false;
            }
        },
        async redirect({ baseUrl }: { baseUrl: string }) {
            // {url, }: {url: string; }
            return baseUrl;
        },
        async session({
        session,
        }: // session: { user },
        {
        session: Session;
        // user: User;
        }) {
            // can't get id on session or user here
            return session;
        },
    },
})