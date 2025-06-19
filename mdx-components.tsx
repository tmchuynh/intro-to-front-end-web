import type { MDXComponents } from "mdx/types";
import Button from "./src/components/Button";
import Guides from "./src/components/Guides";
import Resources from "./src/components/Resources";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    h1: ({ children }) => (
      <h1 className="mb-6 font-bold text-4xl">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="mb-4 font-semibold text-3xl">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-3 font-medium text-2xl">{children}</h3>
    ),
    p: ({ children, className, ...props }) => {
      // If className is provided, it's likely an explicit JSX <p> element
      // So we return it as-is to avoid wrapping issues
      if (className) {
        return (
          <span className={className} {...props}>
            {children}
          </span>
        );
      }
      // For markdown-generated paragraphs, use our styled div
      return <span className="mb-4 leading-relaxed">{children}</span>;
    },
    ul: ({ children }) => (
      <ul className="space-y-2 mb-4 list-disc list-inside">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="space-y-2 mb-4 list-decimal list-inside">{children}</ol>
    ),
    li: ({ children }) => <li className="ml-4">{children}</li>,
    blockquote: ({ children }) => (
      <blockquote className="my-4 pl-4 border-gray-300 border-l-4 italic">
        {children}
      </blockquote>
    ),
    code: ({ children }) => (
      <code className="bg-gray-100 px-2 py-1 rounded font-mono text-sm">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="bg-gray-100 mb-4 p-4 rounded-lg overflow-x-auto">
        {children}
      </pre>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-blue-600 hover:text-blue-800 underline"
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    ),
    // Custom components
    Button,
    Guides,
    Resources,
    ...components,
  };
}
