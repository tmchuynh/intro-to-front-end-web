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
      <ul className="space-y-2 my-4 list-disc list-outside">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="space-y-2 my-4 list-decimal list-outside">{children}</ol>
    ),
    li: ({ children }) => <li className="ml-9">{children}</li>,
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
    // Table components
    table: ({ children }) => (
      <div className="mb-6 overflow-x-auto">
        <table className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-lg min-w-full">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-gray-50 dark:bg-gray-700">{children}</thead>
    ),
    tbody: ({ children }) => (
      <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
        {children}
      </tbody>
    ),
    tr: ({ children }) => (
      <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
        {children}
      </tr>
    ),
    th: ({ children }) => (
      <th className="px-6 py-3 border-gray-200 dark:border-gray-600 border-b font-medium text-gray-500 text-left text-xs dark:text-gray-300 uppercase tracking-wider">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-6 py-4 border-gray-200 dark:border-gray-600 border-b text-gray-900 text-sm dark:text-gray-100">
        {children}
      </td>
    ),
    // Custom components
    Button,
    Guides,
    Resources,
    ...components,
  };
}
