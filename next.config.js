/** @type {import('next').NextConfig} */
const nextConfig = {
  // Tambahkan blok 'images' di bawah ini
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;