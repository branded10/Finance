// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";

// let clientId = process.env.GOOGLE_CLIENT_ID;
// let clientSecret = process.env.GOOGLE_CLIENT_SECRET;

// if (!clientId || !clientSecret) {
//   throw new Error("Google Client ID and Secret must be defined");
// }

// export const authOptions = {
//   providers: [
//     GoogleProvider({
//       //   clientId: process.env.GOOGLE_CLIENT_ID,
//       //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       clientId,
//       clientSecret,
//     }),
//   ],
//   pages: {
//     signIn: "/signin",
//   },
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };

import startDb from "@/lib/db";
import UserModel from "@/mongodb/models/User";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
// import type { NextApiRequest } from "next";

interface Credentials {
  email: string;
  password: string;
}

let clientId = process.env.GOOGLE_CLIENT_ID;
let clientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (!clientId || !clientSecret) {
  throw new Error("Google Client ID and Secret must be defined");
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt", // 2nd strategy is database apart from jwt, NOTE: that we need ```NEXTAUTH_SECRET``` in .env file
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {}, // empty object as this provides UI for signin but we dont want that
      async authorize(
        credentials: Record<never, string> | undefined,
        req: any
      ) {
        if (!credentials) throw Error("Credentials are missing!");

        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        await startDb(); // after getting custom email,password , we call this function to connect to our database

        const user = await UserModel.findOne({ email });
        if (!user) throw Error("Email/Password Mismatch!");

        const passwordMatch = await user.comparePassword(password);
        if (!passwordMatch) throw Error("Email/Password Mismatch!");

        return {
          id: user._id, // Assuming the user object has an _id property, as without this, its giving typescript error
          name: user.name,
          email: user.email,
        };
      },
    }),
    GoogleProvider({
        clientId,
        clientSecret,
      }),
  ],

  // passing these dewtails to Frontend so using callbacks
  callbacks: {
    jwt(params: any) {
      if (params.user) {
        params.token.id = params.user.id;
      }

      // returning final token
      return params.token;
    },
    session({ session, token }) {
      if (session.user) {
        (session.user as { id: string }).id = token.id as string;
        console.log("Session => ", session);
      }
      return session;
    },
  },
};

const authHandler = NextAuth(authOptions);

// export const GET = authHandler
// export const POST = authHandler

export { authHandler as GET, authHandler as POST };