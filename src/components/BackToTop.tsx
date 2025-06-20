"use client";

interface BackToTopProps {
  tocId?: string;
  className?: string;
}

export default function BackToTop({
  tocId = "table-of-contents",
  className = "",
}: BackToTopProps) {
  const scrollToTOC = () => {
    const element = document.getElementById(tocId);
    if (element) {
      const offsetTop = element.offsetTop - 80; // Account for fixed header
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={`flex justify-end mt-6 mb-8 ${className}`}>
      <button
        onClick={scrollToTOC}
        className="inline-flex items-center px-3 py-2 font-medium text-blue-600 text-sm hover:text-blue-800 hover:underline transition-colors duration-200"
        aria-label="Back to table of contents"
      >
        <svg
          className="mr-1 w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16l-4-4m0 0l4-4m-4 4h18"
          />
        </svg>
        Back to Table of Contents
      </button>
    </div>
  );
}
