import NextAuth, { NextAuthOptions } from "next-auth"
import { FirestoreAdapter } from "@next-auth/firebase-adapter"
import CredentialsProvider from "next-auth/providers/credentials"
import login from "@/repository/auth"




export const authOptions : NextAuthOptions =  {
  secret : process.env.NEXTAUTH_SECRET || "soygotto",
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
        name : 'Credentials',
        credentials: {
            email: { label: 'Username', type: 'email' },
            password: { label: 'Password', type: 'password' }
        },
        async authorize(credentials) {
            const user = await login({
                email : credentials?.email ?? "" ,
                password : credentials?.password ?? "" 
            })
            return user
        }
    })
    // ...add more providers here
  ],
  callbacks: {
        jwt: async ({ token, user }) => {
            user && (token.user = user)
            return token
        },
        session: async ({ session, token }) => {
            session.user = token.user
            return session
        }
    },
}

export default NextAuth(authOptions)