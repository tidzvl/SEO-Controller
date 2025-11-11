import type { NextConfig } from "next";
import { env } from "process";

const { i18n } = require('./next-i18next.config')

const nextConfig: NextConfig = {
  allowedDevOrigins: [env.REPLIT_DOMAINS?.split(",")[0]],
  i18n,
  reactStrictMode: true,
  // Enable standalone output for Docker
  output: 'standalone',
};

module.exports = nextConfig;
