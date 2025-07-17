/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co', // サブドメイン含めて許可
        port: '',
        pathname: '/storage/v1/object/public/post-thumbnail/**'
      }
    ]
  }
};

export default nextConfig;
