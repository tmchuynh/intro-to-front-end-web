import type { NavigationItem } from "@/utils/navigation";
import Link from "next/link";

interface NavigationSectionProps {
  title: string;
  items: NavigationItem[];
}

export default function NavigationSection({
  title,
  items,
}: NavigationSectionProps) {
  return (
    <div>
      <h3 className="mb-3 font-semibold text-gray-500 text-xs dark:text-gray-400 uppercase tracking-wider">
        {title}
      </h3>
      <ul className="space-y-1">
        {items.map((item, index) => (
          <NavigationItem
            key={`${item.href}-${item.title}-${index}`}
            item={item}
          />
        ))}
      </ul>
    </div>
  );
}

function NavigationItem({ item }: { item: NavigationItem }) {
  const hasChildren = item.children && item.children.length > 0;

  if (hasChildren) {
    return (
      <li>
        <div className="px-3 py-2 font-medium text-gray-900 text-sm dark:text-white">
          {item.title}
        </div>
        <ul className="space-y-1 mt-1 ml-3 border-gray-200 dark:border-gray-700 border-l">
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
