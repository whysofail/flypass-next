import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Email",
          type: "text",
          placeholder: "example@mail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const response = await fetch("http://localhost:5000/v1/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        });
        const user = await response.json();

        if (response.ok && user) {
          return user.user;
        } else {
          // If authentication fails, return null
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  events: {
    async signOut({ session, token, user }) {
      console.log("Sign out!");
      await fetch("http://localhost:5000/v1/logout", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      session = null;
      token = null;
      user = null;
      return null;
    },
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, _, user }) {
      if (user) {
        token.accessToken = user?.accessToken;
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      const user = {
        id: token.id,
        role: token.role,
        ...token,
      };
      session.accessToken = token.accessToken;
      session.user = user;
      return session;
    },
  },
};

export default authOptions;
