/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: ['fakestoreapi.com', 'robohash.org'],
    formats: ['image/avif', 'image/webp'],
  },
  env: {
    NEXTAUTH_SECRET: 'emCVHD9B0NGCQrgiJUeaZoYyHYJRdf0Lug+1o8xXOeI='
  }
}