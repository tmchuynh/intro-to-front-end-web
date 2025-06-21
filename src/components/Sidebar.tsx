import { useNavigation } from "@/hooks/useNavigation";
import type { NavigationItem } from "@/utils/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import NavigationSection from "./NavigationSection";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { navigation, loading } = useNavigation();
  const pathname = usePathname();
  const [openSection, setOpenSection] = useState<string | null>(null);

  // Function to find which section contains the current path
  const findSectionForPath = (path: string) => {
    for (const section of navigation) {
      if (checkItemContainsPath(section.items, path)) {
        return section.title;
      }
    }
    return null;
  };

  // Recursive function to check if any item or its children contain the path
  const checkItemContainsPath = (
    items: NavigationItem[],
    path: string
  ): boolean => {
    for (const item of items) {
      // Check direct match
      if (item.href === path) {
        return true;
      }
      // Check if path starts with this item's path (for sub-routes)
      if (path.startsWith(item.href + "/") && item.href !== "#") {
        return true;
      }
      // Recursively check children
      if (item.children && checkItemContainsPath(item.children, path)) {
        return true;
      }
    }
    return false;
  };

  // Set the section containing the current page as open by default
  useEffect(() => {
    if (navigation.length > 0 && openSection === null) {
      const currentSection = findSectionForPath(pathname);
      if (currentSection) {
        setOpenSection(currentSection);
      } else {
        // Fallback to first section if no match found
        setOpenSection(navigation[0].title);
      }
    }
  }, [navigation, pathname, openSection]);

  const handleSectionToggle = (sectionTitle: string) => {
    setOpenSection(openSection === sectionTitle ? null : sectionTitle);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden overlay"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        id="sidebar"
        className={`
        sidebar-section fixed top-0 left-0 z-50 w-64 h-full border-r
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:z-auto
      `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div
            className="flex items-center justify-between p-4 border-b"
            style={{ borderColor: "var(--sidebar-border)" }}
          >
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex items-center justify-center h-8 w-8 brand-logo">
                <span className="font-bold text-lg text-white">W</span>
              </div>
              <span
                className="font-bold text-xl"
                style={{ color: "var(--sidebar-text)" }}
              >
                Web Intro
              </span>
            </Link>
            <button
              onClick={onClose}
              className="lg:hidden p-1 rounded-md"
              style={{ color: "var(--sidebar-text-secondary)" }}
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-6">
              {loading ? (
                <div className="animate-pulse">
                  <div
                    className="mb-3 rounded h-4"
                    style={{ backgroundColor: "var(--sidebar-hover-bg)" }}
                  ></div>
                  <div className="space-y-2">
                    <div
                      className="rounded h-3"
                      style={{ backgroundColor: "var(--sidebar-hover-bg)" }}
                    ></div>
                    <div
                      className="rounded h-3"
                      style={{ backgroundColor: "var(--sidebar-hover-bg)" }}
                    ></div>
                    <div
                      className="rounded h-3"
                      style={{ backgroundColor: "var(--sidebar-hover-bg)" }}
                    ></div>
                  </div>
                </div>
              ) : (
                navigation.map((section) => (
                  <NavigationSection
                    key={section.title}
                    title={section.title}
                    items={section.items}
                    isOpen={openSection === section.title}
                    onToggle={() => handleSectionToggle(section.title)}
                  />
                ))
              )}
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
}
