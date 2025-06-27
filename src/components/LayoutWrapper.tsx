"use client";

import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { ThemeProvider } from "./ThemeProvider";
import TopNavbar from "./TopNavbar";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  // Initialize sidebar state from localStorage or default to true for desktop
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Load sidebar preference from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem("sidebar-open");
    if (savedState !== null) {
      setSidebarOpen(JSON.parse(savedState));
    }
    setMounted(true);
  }, []);

  // Save sidebar state to localStorage whenever it changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("sidebar-open", JSON.stringify(sidebarOpen));
    }
  }, [sidebarOpen, mounted]);

  // Add keyboard shortcut for toggling sidebar (Ctrl/Cmd + B)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'b') {
        event.preventDefault();
        toggleSidebar();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <ThemeProvider>
      <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

        {/* Main content area */}
        <div className={`flex flex-1 flex-col min-w-0 transition-all duration-300 ${
          sidebarOpen ? 'lg:ml-96' : 'lg:ml-0'
        }`}>
          {/* Top navbar */}
          <TopNavbar onToggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />

          {/* Main content */}
          <main className="flex-1 overflow-auto">
            <div className="mx-auto px-4 lg:px-8 py-8">{children}</div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}
