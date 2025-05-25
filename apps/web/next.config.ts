
const isDev = process.env.NODE_ENV === 'development';

const nextConfig = {
  ...(isDev && {
    allowedDevOrigins: ["*"],
  }),
};

export default nextConfig;
