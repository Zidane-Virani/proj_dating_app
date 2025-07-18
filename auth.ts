import NextAuth from "next-auth"
import authConfig from "./src/auth.config"
 

export const { handlers: {GET, POST}, auth, signIn, signOut } = NextAuth({
  callbacks: {
    async session({token, session}){
      if (token.sub && session.user){
        session.user.id = token.sub;
      }
      return session;
    }
  },
  session: { strategy: "jwt" },
  ...authConfig,
})