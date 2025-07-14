import NextAuth from "next-auth"
import authConfig from "./src/auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./src/lib/prisma"
 

export const { handlers: {GET, POST}, auth, signIn, signOut } = NextAuth({
  callbacks: {
    // async session({token, session}){
    //   console.log('TOKEN:', token);
    //   console.log('SESSION BEFORE:', session);
      
    //   // Add custom data to session (this is what the instructor probably had)
    //   if (token.sub) {
    //     session.user.id = token.sub;
    //   }
      
    //   console.log('SESSION AFTER:', session);
    //   return session;
    // }
    async session({token, session}){
      if (token.sub && session.user){
        session.user.id = token.sub;
      }
      return session;
    }
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
})