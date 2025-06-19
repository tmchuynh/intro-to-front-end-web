import { useNavigation } from "@/hooks/useNavigation";
import Link from "next/link";
import NavigationSection from "./NavigationSection";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { navigation, loading } = useNavigation();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="z-40 fixed inset-0 lg:hidden bg-black bg-opacity-50"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed top-0 left-0 z-50 w-64 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:z-auto
      `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex justify-between items-center p-4 border-gray-200 dark:border-gray-700 border-b">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex justify-center items-center bg-emerald-500 rounded-lg w-8 h-8">
                <span className="font-bold text-lg text-white">W</span>
              </div>
              <span className="font-bold text-gray-900 text-xl dark:text-white">
                Web Intro
              </span>
            </Link>
            <button
              onClick={onClose}
              className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <svg
                className="w-5 h-5"
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
                  <div className="bg-gray-200 dark:bg-gray-700 mb-3 rounded h-4"></div>
                  <div className="space-y-2">
                    <div className="bg-gray-200 dark:bg-gray-700 rounded h-3"></div>
                    <div className="bg-gray-200 dark:bg-gray-700 rounded h-3"></div>
                    <div className="bg-gray-200 dark:bg-gray-700 rounded h-3"></div>
                  </div>
                </div>
              ) : (
                navigation.map((section) => (
                  <NavigationSection
                    key={section.title}
                    title={section.title}
                    items={section.items}
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
