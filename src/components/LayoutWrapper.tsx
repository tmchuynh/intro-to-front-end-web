"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="flex bg-gray-50 dark:bg-gray-900 h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      {/* Main content area */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Top navbar */}
        <TopNavbar onToggleSidebar={toggleSidebar} />

        {/* Main content */}
        <main className="flex-1 overflow-auto">
          <div className="mx-auto px-4 lg:px-8 py-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
