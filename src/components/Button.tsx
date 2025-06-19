import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  href?: string;
  variant?: "text" | "filled" | "outline";
  arrow?: "right" | "left";
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}

export default function Button({
  href,
  variant = "filled",
  arrow,
  className = "",
  children,
  onClick,
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center gap-2 font-medium transition-colors";

  const variantClasses = {
    filled: "bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-lg",
    outline:
      "border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg",
    text: "text-blue-600 hover:text-blue-700",
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  const content = (
    <>
      {arrow === "left" && (
        <svg
          className="w-4 h-4"
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
          className="w-4 h-4"
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
