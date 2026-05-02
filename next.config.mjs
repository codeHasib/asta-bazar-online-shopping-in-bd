/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dhvqoegn5/**",
      },
    ],
  },
  /* config options here */
  reactCompiler: true,
};

export default nextConfig;
