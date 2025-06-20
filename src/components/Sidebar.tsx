import { useNavigation } from "@/hooks/useNavigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import NavigationSection from "./NavigationSection";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { navigation, loading } = useNavigation();
  const [openSection, setOpenSection] = useState<string | null>(null);

  // Set the first section as open by default when navigation loads
  useEffect(() => {
    if (navigation.length > 0 && openSection === null) {
      setOpenSection(navigation[0].title);
    }
  }, [navigation, openSection]);

  const handleSectionToggle = (sectionTitle: string) => {
    setOpenSection(openSection === sectionTitle ? null : sectionTitle);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="z-40 fixed inset-0 lg:hidden overlay"
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
            className="flex justify-between items-center p-4 border-b"
            style={{ borderColor: "var(--sidebar-border)" }}
          >
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex justify-center items-center w-8 h-8 brand-logo">
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
