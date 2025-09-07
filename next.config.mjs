/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Removed experimental.optimizeCss because it required 'critters' and caused build failures.
};

export default nextConfig;
