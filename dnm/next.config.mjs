/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Hostinger's Premium plan is static shared hosting — no Node.js process.
  // `output: "export"` builds plain HTML/CSS/JS into `out/` for upload.
  output: "export",
};

export default nextConfig;
