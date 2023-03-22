import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
// import FacebookProvider from "next-auth/providers/facebook";
// import GithubProvider from "next-auth/providers/github";
// import TwitterProvider from "next-auth/providers/twitter";
// import Auth0Provider from "next-auth/providers/auth0";
// import AppleProvider from "next-auth/providers/apple"
// import EmailProvider from "next-auth/providers/email"
import prisma from "../../../lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "database",
  },
  secret: process.env.SECRET,
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [

    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
  ],
  theme: {
    colorScheme: "dark",
  },
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      return token;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
};

export default NextAuth(authOptions);
