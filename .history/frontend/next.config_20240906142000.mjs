/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"], // Autorise les images à partir de Cloudinary
    formats: ["image/avif", "image/webp"], // Optionnel : active les formats AVIF et WebP pour une meilleure optimisation
  },
};

export default nextConfig;
