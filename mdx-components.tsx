import type { MDXComponents } from "mdx/types";
import { JSX } from "react";
import Button from "./src/components/Button";
import CopyButton from "./src/components/CopyToClipboard";
import Guides from "./src/components/Guides";
import Resources from "./src/components/Resources";

// Utility function to extract text content from React children
function extractTextContent(children: React.ReactNode): string {
  if (typeof children === "string") {
    return children;
  }
  if (typeof children === "number") {
    return children.toString();
  }
  if (Array.isArray(children)) {
    return children.map(extractTextContent).join("");
  }
  if (children && typeof children === "object" && "props" in children) {
    const element = children as { props: { children?: React.ReactNode } };
    return extractTextContent(element.props.children);
  }
  return "";
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
        className="my-3 font-medium italic text-xl"
      >
        {children}
      </CustomHeading>
    ),
    h5: ({ children, ...props }) => (
      <CustomHeading level={5} id={props.id} className="font-bold uppercase">
        {children}
      </CustomHeading>
    ),
    h6: ({ children, ...props }) => (
      <CustomHeading
        level={6}
        id={props.id}
        className="mb-1 font-thin underline underline-offset-4 decoration-dashed decoration-muted"
      >
        {children}
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
      // For markdown-generated paragraphs, use a span with block display to avoid HTML nesting issues
      return <span className="block mb-4 leading-relaxed">{children}</span>;
    },
    ul: ({ children }) => (
      <ul className="space-y-1 list-disc list-outside">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="space-y-1 my-1 list-decimal list-outside">{children}</ol>
    ),
    li: ({ children }) => <li className="mb-1 ml-9">{children}</li>,
    code: ({ children }) => (
      <code className="my-5 py-1 font-mono text-sm">{children}</code>
    ),
    pre: ({ children }) => {
      const textContent = extractTextContent(children);
      return (
        <>
          <div className="bg-code-blocks relative my-5 px-4 border-zinc-700 dark:border-zinc-800 rounded-2xl overflow-y-auto">
            <CopyButton textToCopy={textContent} />
            <pre className="my-4 p-4">{children}</pre>
          </div>
          <br />
        </>
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
      <>
        <br />
        <table className="shadow-sm rounded-lg min-w-full">{children}</table>
        <br />
      </>
    ),
    thead: ({ children }) => <thead className="">{children}</thead>,
    tbody: ({ children }) => (
      <tbody className="bg-table-body divide-gray-200 dark:divide-gray-600 divide-y text-table-body-foreground">
        {children}
      </tbody>
    ),
    tr: ({ children }) => (
      <tr className="hover:bg-table-hover text-left transition-colors">
        {children}
      </tr>
    ),
    th: ({ children }) => (
      <th className="bg-table-head px-6 py-3 border-b font-medium text-center text-table-head-foreground tracking-wider uppercase">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-6 py-4 border-gray-200 dark:border-gray-600 border-b text-sm dark:text-gray-100">
        {children}
      </td>
    ),
    img: ({ src, alt, ...props }) => (
      <img src={src} alt={alt} className="mx-auto my-6 rounded-lg" {...props} />
    ),
    blockquote: ({ children }) => (
      <>
        <blockquote>{children}</blockquote>
        <br />
      </>
    ),
    // Custom components
    Button,
    Guides,
    Resources,
    ...components,
  };
}
