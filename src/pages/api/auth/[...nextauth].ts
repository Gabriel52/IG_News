import { query as q } from 'faunadb'

import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";

import { fauna } from '../../../services/fauna'

export default NextAuth({
  // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_SECRET_ID,
            authorization: {
                params: { scope: "read:user" }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        })
        // ...add more providers here
    ],
    secret: process.env.SIGNING_KEY,
    callbacks: {
        async signIn({ user, account, profile }) {
            const { email } = user
            try{
                await fauna.query(
                    q.If(
                        q.Not(
                            q.Exists(
                                q.Match(
                                    q.Index('user_by_email'),
                                    q.Casefold(user.email)
                                )
                            )
                        ),
                        q.Create(
                            q.Collection('users'),
                            { data: {email}},
                        ),
                        q.Get(
                            q.Match(
                                q.Index('user_by_email'),
                                q.Casefold(user.email)
                            )
                        )
                    )
                )
                return true
            }catch(err){
                console.log(err)
                return false
            }
        },
        async session({ session }) {
            try {
                
                const userActiveSubscription = await fauna.query(
                    q.Get(
                        q.Intersection([
                            q.Match(
                                q.Index('subscription_by_user_ref'),
                                q.Select(
                                    "ref",
                                    q.Get(
                                        q.Match(
                                            q.Index('user_by_email'),
                                            q.Casefold(session.user.email)
                                        )
                                    )
                                )
                            ),
                            q.Match(
                                q.Index('subscription_by_status'),
                                "active"
                            )
                        ])
    
                    )
                )
                return {
                    ...session,
                    activeSubscription: userActiveSubscription
                }
            } catch(err){
                console.log(err)
                return {
                    ...session,
                    activeSubscription: null
                }
            }
        },
    }
})