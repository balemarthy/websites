/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Hostinger's Premium plan is static shared hosting — no Node.js process
  // for next/image's optimization server. `output: "export"` builds plain
  // HTML/CSS/JS into `out/`; `images.unoptimized` skips the optimization
  // step so `next/image` just renders a plain <img> against the original
  // file instead of a (non-existent, on this host) /_next/image endpoint.
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
