import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '../../../lib/mongodb';

export default NextAuth({
  // Konfigurasi provider autentikasi (Google)
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  // Menggunakan MongoDB Adapter untuk menyimpan user, session, dll.
  adapter: MongoDBAdapter(clientPromise),
  
  // Menggunakan strategi session JWT
  session: {
    strategy: 'jwt',
  },

  // Halaman kustom (opsional, tapi bagus untuk dimiliki)
  pages: {
    signIn: '/', // Arahkan ke homepage jika perlu sign in
  },

  // Secret untuk meng-enkripsi JWT
  secret: process.env.NEXTAUTH_SECRET,
});