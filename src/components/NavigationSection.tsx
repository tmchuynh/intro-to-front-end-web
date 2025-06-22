import type { NavigationItem } from "@/utils/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

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
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  // Reset expanded item when section is closed
  useEffect(() => {
    if (!isOpen) {
      setExpandedItem(null);
    }
  }, [isOpen]);

  const handleItemToggle = (itemTitle: string) => {
    setExpandedItem(expandedItem === itemTitle ? null : itemTitle);
  };

  return (
    <div>
      <button
        onClick={onToggle}
        className={`flex justify-between items-center mb-3 w-full  font-semibold text-left text-xs uppercase tracking-wider transition-colors ${
          isOpen
            ? "text-sidebar-active-text"
            : "text-sidebar-text hover:text-sidebar-text-secondary "
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
          {items.map((item, index) => {
            const hasChildren = item.children && item.children.length > 0;
            return (
              <NavigationItem
                key={`${item.href}-${item.title}-${index}`}
                item={item}
                {...(hasChildren && {
                  isExpanded: expandedItem === item.title,
                  onToggle: () => handleItemToggle(item.title),
                })}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function NavigationItem({
  item,
  isExpanded,
  onToggle,
  depth = 0,
}: {
  item: NavigationItem;
  isExpanded?: boolean;
  onToggle?: () => void;
  depth?: number;
}) {
  const hasChildren = item.children && item.children.length > 0;
  const [expandedChild, setExpandedChild] = useState<string | null>(null);

  // Reset expanded child when this item is collapsed
  useEffect(() => {
    if (!isExpanded) {
      setExpandedChild(null);
    }
  }, [isExpanded]);

  const handleChildToggle = (childTitle: string) => {
    setExpandedChild(expandedChild === childTitle ? null : childTitle);
  };

  if (hasChildren) {
    return (
      <li>
        <button
          onClick={onToggle}
          className={`flex justify-between items-center px-3 py-2 w-full font-medium text-left text-sm transition-colors rounded-md ${
            isExpanded ? "bg-primary/50" : "hover:bg-sidebar-border"
          }`}
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
          <ul
            className={`space-y-1 mt-1 ml-3 border-gray-200 dark:border-gray-700 ${
              isExpanded ? "pb-2" : ""
            } ${depth === 0 ? "border-l" : ""}`}
          >
            {item.children!.map((child, childIndex) => {
              const childHasChildren =
                child.children && child.children.length > 0;
              return (
                <NavigationItem
                  key={`${child.href}-${child.title}-${childIndex}`}
                  item={child}
                  depth={depth + 1}
                  {...(childHasChildren && {
                    isExpanded: expandedChild === child.title,
                    onToggle: () => handleChildToggle(child.title),
                  })}
                />
              );
            })}
          </ul>
        </div>
      </li>
    );
  }

  return (
    <li>
      <Link
        href={item.href}
        className="block ml-1 px-3 py-2 hover:bg-sidebar-border rounded-md text-sm transition-colors"
      >
        {item.title}
      </Link>
    </li>
  );
}
