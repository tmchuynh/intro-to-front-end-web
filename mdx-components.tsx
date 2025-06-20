import type { MDXComponents } from "mdx/types";
import { JSX } from "react";
import Button from "./src/components/Button";
import Guides from "./src/components/Guides";
import Resources from "./src/components/Resources";
import CopyButton from "./src/components/CopyToClipboard";

// Utility function to extract text content from React children
function extractTextContent(children: React.ReactNode): string {
  if (typeof children === 'string') {
    return children;
  }
  if (typeof children === 'number') {
    return children.toString();
  }
  if (Array.isArray(children)) {
    return children.map(extractTextContent).join('');
  }
  if (children && typeof children === 'object' && 'props' in children) {
    return extractTextContent(children.props.children);
  }
  return '';
}

interface Props {
  children: React.ReactNode;
  level: number;
  id: string;
  className?: string;
}

export function CustomHeading({ children, level, id, className }: Props) {
  const Component = `h${level}` as keyof JSX.IntrinsicElements;
  return (
    <Component id={id} className={`scroll-mt-24 ${className}`}>
      {children}
    </Component>
  );
}
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    h1: ({ children, ...props }) => (
      <CustomHeading
        className="my-6 font-bold text-4xl"
        level={1}
        id={props.id}
      >
        {children}
      </CustomHeading>
    ),
    h2: ({ children, ...props }) => (
      <CustomHeading level={2} id={props.id} className="my-4 text-3xl">
        {children}
      </CustomHeading>
    ),
    h3: ({ children, ...props }) => (
      <CustomHeading
        level={3}
        id={props.id}
        className="my-3 font-medium text-2xl"
      >
        {children}
      </CustomHeading>
    ),
    h4: ({ children, ...props }) => (
      <CustomHeading
        level={4}
        id={props.id}
        className="my-3 font-medium text-xl underline underline-offset-2"
      >
        {children}:
      </CustomHeading>
    ),
    h5: ({ children, ...props }) => (
      <CustomHeading
        level={5}
        id={props.id}
        className="font-bold text-sm uppercase"
      >
        {children}:
      </CustomHeading>
    ),
    p: ({ children, className, ...props }) => {
      // If className is provided, it's likely an explicit JSX <p> element
      // So we return it as-is to avoid wrapping issues
      if (className) {
        return (
          <p className={className} {...props}>
            {children}
          </p>
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
    strong: ({ children }) => (
      <strong className="font-extrabold">{children}</strong>
    ),
    code: ({ children }) => (
      <code className="my-5 py-1 font-mono text-sm">{children}</code>
    ),
    pre: ({ children }) => {
      const textContent = extractTextContent(children);
      return (
        <div className="relative bg-zinc-800 dark:bg-transparent my-5 px-4 border-zinc-700 dark:border-zinc-800 rounded-2xl overflow-y-auto">
          <CopyButton textToCopy={textContent} />
          <pre className="my-4 p-4">{children}</pre>
        </div>
      );
    },
    a: ({ href, children }) => (
      <a
        href={href}
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    ),
    // Table components
    table: ({ children }) => (
      <table className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-lg min-w-full">
        {children}
      </table>
    ),
    thead: ({ children }) => (
      <thead className="bg-gray-50 dark:bg-gray-700">{children}</thead>
    ),
    tbody: ({ children }) => (
      <tbody className="divide-gray-200 dark:divide-gray-600 divide-y">
        {children}
      </tbody>
    ),
    tr: ({ children }) => (
      <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 text-left transition-colors">
        {children}
      </tr>
    ),
    th: ({ children }) => (
      <th className="px-6 py-3 border-gray-200 dark:border-gray-600 border-b font-medium text-center text-gray-500 text-xs dark:text-gray-300 tracking-wider uppercase">
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
