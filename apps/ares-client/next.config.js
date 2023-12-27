/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    ACCESS_SECRET_TOKEN: process.env.ACCESS_SECRET_TOKEN,
    ARES_ENDPOINT: process.env.ARES_ENDPOINT,
  },
};

module.exports = nextConfig;
