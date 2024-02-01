import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
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
        console.log(credentials);
        const { email, password } = credentials;
        const response = await fetch("http://localhost:5000/v1/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const user = await response.json();
        console.log(user);
        if (response.ok && user) {
          return Promise.resolve(user);
        } else {
          // If authentication fails, return null
          return Promise.resolve(null);
        }
      },
    }),
  ],
  events: {
    async signIn({ user }) {
      console.log(user);
    },
    async signOut({ session }) {
      console.log("asdasd");
      const response = await fetch("http://localhost:5000/v1/logout", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      session = {};
      cookies.delete();
      console.log(response);
      return Promise.resolve(null);
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.accessToken = token.user.accessToken;
      session.user.id = token.id;
      session.user.email = token.user.email;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
