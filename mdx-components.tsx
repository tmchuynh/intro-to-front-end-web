import type { MDXComponents } from "mdx/types";
import { JSX } from "react";
import Button from "./src/components/Button";
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
        className="my-6 font-[IbarraRealNova] font-extrabold text-5xl"
        level={1}
        id={props.id}
      >
        {children}
      </CustomHeading>
    ),
    h2: ({ children, ...props }) => (
      <CustomHeading
        level={2}
        id={props.id}
        className="my-4 font-[IbarraRealNova] font-black text-3xl tracking-tighter"
      >
        {children}
      </CustomHeading>
    ),
    h3: ({ children, ...props }) => (
      <CustomHeading
        level={3}
        id={props.id}
        className="my-4 font-[IbarraRealNova] font-light text-2xl tracking-wide"
      >
        <br />
        {children}
      </CustomHeading>
    ),
    h4: ({ children, ...props }) => (
      <CustomHeading
        level={4}
        id={props.id}
        className="my-4 font-[DMSerifText] text-xl"
      >
        <br />
        <br />
        {children}
      </CustomHeading>
    ),
    h5: ({ children, ...props }) => (
      <CustomHeading
        level={5}
        id={props.id}
        className="mt-6 decoration-border font-[DMSerifText] text-lg"
      >
        {children}
      </CustomHeading>
    ),
    h6: ({ children, ...props }) => (
      <CustomHeading
        level={6}
        id={props.id}
        className="mb-1 font-[BodoniModaSC] font-light"
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
      <code className="my-5 py-1 font-[CascadiaCode] font-semibold text-sm">
        {children}
      </code>
    ),
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
        <table className="shadow-md rounded-lg min-w-full overflow-clip">
          {children}
        </table>
        <br />
      </>
    ),
    thead: ({ children }) => <thead className="">{children}</thead>,
    tbody: ({ children }) => (
      <tbody className="bg-table-body text-table-body-foreground">
        {children}
      </tbody>
    ),
    tr: ({ children }) => (
      <tr className="hover:bg-table-hover text-left transition-colors">
        {children}
      </tr>
    ),
    th: ({ children }) => (
      <th className="bg-table-head px-6 py-3 font-medium text-table-head-foreground tracking-wider uppercase">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-6 py-4 border-b-1 border-table-hover text-sm">
        {children}
      </td>
    ),
    img: ({ src, alt, ...props }) => (
      <img src={src} alt={alt} className="mx-auto my-6 rounded-lg" {...props} />
    ),
    blockquote: ({ children }) => (
      <>
        <blockquote>{children}</blockquote>
      </>
    ),
    // Custom components
    Button,
    Guides,
    Resources,
    ...components,
  };
}
