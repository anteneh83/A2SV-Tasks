import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "select_account",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          const response = await axios.post('https://akil-backend.onrender.com/login', {
            email: credentials?.email,
            password: credentials?.password
          });

          // console.log(response, "response")
          if (response.data.success) {
            return {
              id: response.data.data.id,
              name: response.data.data.name,
              email: response.data.data.email,
              accessToken: response.data.data.accessToken,
              refreshToken: response.data.data.refreshToken,
              role: response.data.data.role
            };
          }
          return null;
        } catch (error) {
          console.error('Login error:', error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 1 day
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.user.role = token.role;
      return session;
    }
  },
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/login',
    error: '/auth/login'
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };