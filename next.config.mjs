import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import createMDX from "@next/mdx";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExpressiveCode from "rehype-expressive-code";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import { remarkAutoCollapse } from "./src/lib/remark-auto-collapse.mjs";

/** @type {import('rehype-expressive-code').RehypeExpressiveCodeOptions} */
const rehypeExpressiveCodeOptions = {
  plugins: [pluginLineNumbers(), pluginCollapsibleSections()],
  themes: ["github-light-default", "github-dark-default"], // Light theme first, then dark theme
  themeCssSelector: (theme) => {
    // Map theme names to next-themes class names
    if (theme.name === "github-light-default") return ".light";
    if (theme.name === "github-dark-default") return ".dark";
    return `[data-theme="${theme.name}"]`;
  },
  useDarkModeMediaQuery: false, // Disable system preference detection to use next-themes instead
  defaultProps: {
    // Enable word wrap by default
    wrap: true,
    // Set default collapse style (optional)
    collapseStyle: "collapsible-auto", // Allows re-collapsing sections
  },
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
      remarkAutoCollapse, // Add the auto-collapse plugin
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
