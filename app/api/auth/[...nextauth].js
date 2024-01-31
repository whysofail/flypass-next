import NextAuth from "next-auth"
import { CredentialsProvider } from "next-auth/providers"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],
}

export default NextAuth(authOptions)