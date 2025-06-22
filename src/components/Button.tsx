import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  href?: string;
  variant?: "text" | "default" | "outline" | "secondary" | "tertiary";
  arrow?: "right" | "left";
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}

export default function Button({
  href,
  variant = "default",
  arrow,
  className = "",
  children,
  onClick,
}: ButtonProps) {
  const baseClasses =
    "inline items-center gap-2 font-medium h-7 transition-colors";

  const variantClasses = {
    default:
      "bg-primary text-primary-foreground hover:bg-blue-700 px-4 rounded-lg",
    secondary:
      "bg-secondary text-secondary-foreground hover:bg-gray-200 px-4 rounded-lg",
    tertiary:
      "bg-tertiary text-tertiary-foreground hover:text-gray-700 px-4 rounded-lg",
    outline:
      "border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 rounded-lg",
    text: "text-blue-600 hover:text-blue-700",
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  const content = (
    <>
      {arrow === "left" && (
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      )}
      {children}
      {arrow === "right" && (
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {content}
    </button>
  );
}
