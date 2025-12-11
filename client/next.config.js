/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com', 'randomuser.me'],
  },
  typescript: {
    // !! WARN !!
    // Allow production builds to complete even with type errors
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint: {
    // Allow production builds even with ESLint errors
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
