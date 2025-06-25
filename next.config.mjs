import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import createMDX from "@next/mdx";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExpressiveCode from "rehype-expressive-code";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";

/** @type {import('rehype-expressive-code').RehypeExpressiveCodeOptions} */
const rehypeExpressiveCodeOptions = {
  plugins: [pluginLineNumbers()],
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include MDX files
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  // Other config options here
  reactStrictMode: true,
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: [
      remarkGfm,
      [
        remarkToc,
        {
          maxDepth: 3, // Limit TOC depth to 3 levels
        },
      ],
    ],
    rehypePlugins: [
      rehypeSlug,
      [rehypeExpressiveCode, rehypeExpressiveCodeOptions],
      [
        rehypeHighlight,
        {
          // Ignore code blocks without language specified
          ignoreMissing: true,
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          properties: {
            className: ["anchor"],
          },
        },
      ],
    ],
  },
});

// Wrap MDX and Next.js config with each other
export default withMDX(nextConfig);
