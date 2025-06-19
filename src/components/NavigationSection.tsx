import type { NavigationItem } from "@/utils/navigation";
import Link from "next/link";
import { useState } from "react";

interface NavigationSectionProps {
  title: string;
  items: NavigationItem[];
  isOpen: boolean;
  onToggle: () => void;
}

export default function NavigationSection({
  title,
  items,
  isOpen,
  onToggle,
}: NavigationSectionProps) {
  return (
    <div>
      <button
        onClick={onToggle}
        className={`flex justify-between items-center mb-3 w-full font-semibold text-left text-xs uppercase tracking-wider transition-colors ${
          isOpen
            ? "text-emerald-600 dark:text-emerald-400"
            : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
        }`}
      >
        {title}
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className={`space-y-1 ${isOpen ? "pb-2" : ""}`}>
          {items.map((item, index) => (
            <NavigationItem
              key={`${item.href}-${item.title}-${index}`}
              item={item}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

function NavigationItem({ item }: { item: NavigationItem }) {
  const hasChildren = item.children && item.children.length > 0;
  const [isExpanded, setIsExpanded] = useState(false);

  if (hasChildren) {
    return (
      <li>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex justify-between items-center px-3 py-2 w-full font-medium text-gray-900 text-left text-sm dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
        >
          {item.title}
          <svg
            className={`w-3 h-3 transition-transform duration-200 ${
              isExpanded ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isExpanded ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <ul className={`space-y-1 mt-1 ml-3 border-gray-200 dark:border-gray-700 border-l ${isExpanded ? "pb-1" : ""}`}>
            {item.children!.map((child, childIndex) => (
              <li key={`${child.href}-${child.title}-${childIndex}`}>
                <Link
                  href={child.href}
                  className="block px-3 py-1 hover:border-emerald-500 border-transparent border-l-2 text-gray-600 text-sm hover:text-gray-900 dark:hover:text-white dark:text-gray-400 transition-colors"
                >
                  {child.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </li>
    );
  }

  return (
    <li>
      <Link
        href={item.href}
        className="block hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 rounded-md text-gray-700 text-sm dark:text-gray-300 transition-colors"
      >
        {item.title}
      </Link>
    </li>
  );
}
