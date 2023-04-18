/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  transpilePackages: ["nextjs-components"],
  swcMinify: true,
  devIndicators: {
    buildActivity: true,
  }
}

export default nextConfig
