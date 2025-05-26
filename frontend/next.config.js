const storageDomain = process.env.NEXT_PUBLIC_STORAGE?.replace(/^https?:\/\//, '') || '';

module.exports = {
  reactStrictMode: true,
  env: {
    baseUrlDomain: process.env.NEXT_PUBLIC_API_URL,
    baseStorage: process.env.NEXT_PUBLIC_STORAGE,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: storageDomain,
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
};
