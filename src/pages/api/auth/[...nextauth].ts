import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials'

const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },
    providers: [
        CredentialsProvider({
            type: 'credentials',
            credentials: {},
            async authorize(credentials, req){
                const { username, password } = credentials as {
                    username: string;
                    password: string;
                };
                //Login Logic
                if (username !== 'userLogin' || password !== '1234') {
                    throw new Error ('Invalid Credentials')
                }

                //If everything is fine
                // return {id: '1234', name: 'John Doe', email: 'john@gmail.com'}
                const res = await fetch('https://random-data-api.com/api/v2/users/', {
                    method: 'GET',
                    headers: { "Content-Type": "application/json"}
                })
                const user = await res.json()
                if (res.ok && user) {
                    return user
                }
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user, account }: any) {
            // Persist the user id to the token right after signin
            if (account) {
                token.id = user.id
                token.username = user.username
                token.picture = user.avatar
                token.name = user.first_name + ' ' + user.last_name
                token.gender = user.gender
                token.birthday = user.date_of_birth
                token.address = user.address
            }
            return token
          },
          async session({ session, token }:any) {
            // Send properties to the client, like an userId from a provider.
            session.user.userId = token.id
            session.user.username = token.username
            session.user.gender = token.gender
            session.user.birthday = token.birthday
            session.user.address = token.address
            return session
          }
    },
    pages: {
        signIn: '/auth/signin',
    }
};

export default NextAuth(authOptions);