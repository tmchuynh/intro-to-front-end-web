import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configure `pageExtensions` to include MDX files
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  // Other config options here
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
});

// Wrap MDX and Next.js config with each other
export default withMDX(nextConfig);
