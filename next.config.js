/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'example.com', 
      'images.unsplash.com', 
      'storage.googleapis.com',
      'storage.supabase.co',
      'your-supabase-url.supabase.co'
    ],
  },
  // Explicitly disable the App Router
  experimental: {
    appDir: false,
  },
}

module.exports = nextConfig
