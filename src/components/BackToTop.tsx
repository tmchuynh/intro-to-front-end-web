"use client";

interface BackToTopProps {
  className?: string;
}

export default function BackToTop({ className = "" }: BackToTopProps) {
  const scrollToTop = () => {
    console.log("BackToTop clicked"); // Debug log

    // Function to find the scrollable element
    const findScrollableParent = () => {
      // Check common scrollable containers
      const possibleContainers = [
        document.documentElement,
        document.body,
        document.querySelector("main"),
        document.querySelector('[role="main"]'),
        document.querySelector(".page-content"),
        document.querySelector("#__next"), // Next.js app container
      ].filter(Boolean);

      for (const container of possibleContainers) {
        if (container && container.scrollTop > 0) {
          return container;
        }
      }

      // If nothing is currently scrolled, return the first scrollable element
      return document.documentElement;
    };

    try {
      const scrollContainer = findScrollableParent();
      console.log("Scrolling element:", scrollContainer); // Debug log

      // Try multiple scroll methods
      // Method 1: Smooth scroll
      if (scrollContainer.scrollTo) {
        scrollContainer.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }

      // Method 2: Window scroll (for body/html)
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      // Method 3: Direct property setting as fallback
      setTimeout(() => {
        scrollContainer.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        window.pageYOffset = 0;
      }, 100);
    } catch (error) {
      console.error("Error scrolling to top:", error);
      // Emergency fallback
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  };

  return (
    <div className={`flex justify-end mt-6 mb-8 ${className}`}>
      <button
        onClick={scrollToTop}
        className="inline-flex items-center px-3 py-2 border border-blue-200 hover:border-blue-400 rounded font-medium text-blue-600 text-sm hover:text-blue-800 hover:underline transition-colors duration-200 cursor-pointer"
        aria-label="Back to top"
        type="button"
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
        Back to Top
      </button>
    </div>
  );
}
