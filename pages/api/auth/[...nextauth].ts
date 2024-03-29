import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { userService } from "@/service/UserService";

declare module "next-auth" {
  interface Session {
    user: {
      _id?: string | null;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
    };
  }
}

declare module "next-auth" {
  interface User {
    role: string;
    _id: string;
  }
}

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error("Please provide process.env.NEXTAUTH_SECRET");
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",

      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials) {
          throw new Error("There aren't credentials!");
        }
        const { email, password } = credentials;
        return userService.signInCredentials(email, password);
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token._id = user._id;
      }

      return token;
    },

    session({ session, token }) {
      if (token && session.user) {
        session.user.role = token.role as string;
        session.user._id = token._id as string;
      }
      return session;
    },
  },

  pages: {
    signIn: "/auth/SignIn",
  },
});
