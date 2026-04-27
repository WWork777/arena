/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      // Добавьте сюда боевой домен Strapi, когда выкатите на сервер
    ],
  },
};

module.exports = nextConfig;
