/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'ptbjgzmliornlkjjqfmi.supabase.co', // 💡 Your new project ID here
          port: '',
          pathname: '/storage/v1/object/public/**',
        },
      ],
    },
  };

export default nextConfig;
