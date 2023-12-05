// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { SessionProvider, getSession, useSession } from "next-auth/react";
// import User from "@/mongodb/models/User";
// import { NextAuthOptions, User as UserType, Profile, Account } from "next-auth";
// // import { JWT } from "next-auth/jwt";
// import jwt from "jsonwebtoken";
// import bcrypt from 'bcrypt';
// import Cookies from 'cookies';


// import connectDb from "@/mongodb/connect";

// // For Google
// interface SignInArgs {
//   user: UserType;
//   account: Account | null;
//   profile?: Profile;
//   email?: string | { verificationRequest?: boolean };
//   // credentials?: Record<string, unknown>,
//   credentials?: {
//     name?: string;
//     email?: string;
//     password?: string;
//     phoneNumber?: string;
//     // country?: string
//   };
// }

// // For JWT
// interface Token {
//   iat: number;
//   exp: number;
//   sub: string;
//   name: string;
//   email: string;
//   picture: string;
// }

// interface Session {
//   user: Token;
// }

// interface UserDetails {
//   name?: string;
//   email?: string;
//   image?: string;
//   password?: string;
//   phoneNumber?: string;
//   // country?: string;
// }

// // const session = await getSession(context);



// export const authOptions: NextAuthOptions = {
//   // Configure one or more authentication providers
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//       authorization: {
//         params: {
//           prompt: "consent",
//           access_type: "offline",
//           response_type: "code",
//         },
//       },
//     }),
//   ],
//   // secret: process.env.SECRET,
//   database: process.env.MONGODB_URI,
//   callbacks: {
//     jwt: async (token:any, user:any, profile:any) => {
//       // If the user is signing in for the first time, use the user data from the provider
//       if (user) {
//         token.userId = user.id
//         token.name = user.name
//         token.email = user.email
//       }
//       // If the user is signing in with the custom registration form, use the user data from the JWT token
//       else {
//         const secret = process.env.JWT_SECRET;
//         if (!secret) {
//           throw new Error("JWT Secret is undefined");
//         }
//         // Verify the JWT token and get the user data
//         const decoded = jwt.verify(token, secret)
//         // Fetch the user from the database using the userId
//         const user = await User.findById(decoded.userId)
//         // Add the user data to the token
//         token.userId = user._id
//         token.name = user.name
//         token.email = user.email
//       }
//       // Return the updated token
//       return token
//     },
//     // Use the session callback to customize the session object
//     session: async (session, token) => {
//       // Add any additional data to the session object here
//       // For example, you can fetch the user's role from the database
//       const role = await getUserRole(token.userId)
//       // Add the role to the session object
//       session.user.role = role
//       // Return the updated session object
//       return session
//     }
//   }
// };

// const handler = connectDb(NextAuth(authOptions));

// export { handler as GET, handler as POST };


import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { SessionProvider, getSession, useSession } from "next-auth/react";
import User from "@/mongodb/models/User";
import { NextAuthOptions, User as UserType, Profile, Account } from "next-auth";
// import { JWT } from "next-auth/jwt";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import Cookies from 'cookies';


import connectDb from "@/mongodb/connect";

// For Google
interface SignInArgs {
  user: UserType;
  account: Account | null;
  profile?: Profile;
  email?: string | { verificationRequest?: boolean };
  // credentials?: Record<string, unknown>,
  credentials?: {
    name?: string;
    email?: string;
    password?: string;
    phoneNumber?: string;
    // country?: string
  };
}

// For JWT
interface Token {
  iat: number;
  exp: number;
  sub: string;
  name: string;
  email: string;
  picture: string;
}

interface Session {
  user: Token;
}

interface UserDetails {
  name?: string;
  email?: string;
  image?: string;
  password?: string;
  phoneNumber?: string;
  // country?: string;
}

// const session = await getSession(context);



export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),

    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: {  label: "Password", type: "password" }
      },

      // PROBLEM LIES Here, Credentials = UNDEFINED and so userdetails and token
      authorize: async (credentials: any) => {
        // const session = await getSession(context);

        const { email, password } = credentials
        let userDetails = {} 

        // Find the user in your database
        const user = await User.findOne({ email })

        if (user) {
          // Compare the provided password with the hashed password in the database
          const isValidPassword = await bcrypt.compare(password, user.password)
          console.log("isValidPassword ===========> ", isValidPassword);
          
          userDetails = {
            name: credentials.name || "",
            email: credentials.email || "",
            password: credentials.password || "",
            phoneNumber: credentials.phoneNumber || "",
            // country: credentials.country || ''
          };

          // If the passwords match, create JWT token
        const token = jwt.sign(userDetails, process.env.JWT_SECRET!, {
          expiresIn: "1h",
        });

        // Set cookie with JWT token
        // const cookies = new Cookies(req, res);
        // cookies.set('token', token, {
        //   httpOnly: true,
        //   secure: process.env.NODE_ENV === 'production',
        //   sameSite: 'lax',
        //   maxAge: 60 * 60 * 24 * 7, // 1 week
        //   path: '/',
        // });


          if (isValidPassword) {
            // If the passwords match, return the user object
            return Promise.resolve(user)
          } else {
            // If the passwords don't match, return null
            return Promise.resolve(null)
          }
        } else {
          // If the user is not found, return null
          return Promise.resolve(null)
        }
      }
    }),
  ],
  secret: process.env.SECRET,
  callbacks: {
    async signIn({
      user,
      account,
      profile,
      email,
      credentials,
    }: SignInArgs): Promise<boolean> {
      try {
        console.log("User:", user);
        console.log("Profile:", profile);
        console.log("Credentials:", credentials);

        let userDetails: UserDetails = {};

        if (account && account.provider === "google") {
          userDetails = {
            name: user.name ? user.name : "",
            email: user.email ? user.email : "",
            image: user.image ? user.image : "",
            // phoneNumber and country will be null
          };
        } else if (credentials) {
          // This is a custom registration
          userDetails = {
            name: credentials.name || "",
            email: credentials.email || "",
            password: credentials.password || "",
            phoneNumber: credentials.phoneNumber || "",
            // country: credentials.country || ''
          };
        }

        // Creating JWT token
        const token = jwt.sign(userDetails, process.env.JWT_SECRET!, {
          expiresIn: "1h",
        });

        // Saving the token and other details in the user document
        const existingUser = await User.findOne({ email: userDetails.email });

        if (existingUser) {
          await User.updateOne(
            { email: userDetails.email },
            { $set: { ...userDetails, token } }
          );
        } else {
          await User.create({ ...userDetails, token });
        }

        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        throw error;
      }
    },
    session: async ({ session, user }) => {
      session.user = user;
      return Promise.resolve(session);
    },
    // async jwt(token, user, account, profile, isNewUser) {
    //   if (user) {
    //     token.name = user.name!
    //     token.email = user.email!
    //     token.picture = user.image!
    //   }
    //   return token
    // },
    // async session(session, token) {
    //   session.user = token
    //   return session
    // },
  },
};

const handler = connectDb(NextAuth(authOptions));

export { handler as GET, handler as POST };