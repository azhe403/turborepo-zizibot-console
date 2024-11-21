/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@zizibot/shadcn"],
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
  },
};

export default nextConfig;
