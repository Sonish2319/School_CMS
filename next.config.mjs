/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['en', 'np'],
    defaultLocale: 'en',
  },
  images: {
    domains: ['127.0.0.1'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/auth/home',
        permanent: true,
      },
    ];
  },
  webpack(config) {
    return config;
  },
};

export default nextConfig;
