

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "lh3.googleusercontent.com",
      },
      {
        hostname: "wallpaperaccess.com",
      },
      {
        hostname: "api.dicebear.com",
      },
      {
        hostname:  "jooinn.com",
      },
      {
        hostname: "www.ggg.jpg",
      },
      {
        hostname: 'utfs.io',
    }
    ],
  },
};

export default nextConfig;
