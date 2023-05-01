/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    emotion: true,
  },
  images: {
    domains: ['maps.googleapis.com'],
  },
}
const withPWA = require('next-pwa')
module.exports = withPWA({
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
  },
  reactStrinctMode: true,
})

module.exports = nextConfig
