/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingIncludes: {
    '/api/**/*': ['./se-dataset (1)/*.md'],
  },
};

export default nextConfig;
