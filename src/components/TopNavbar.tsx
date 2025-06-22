"use client";

import { useState } from "react";

interface TopNavbarProps {
  onToggleSidebar: () => void;
}

export default function TopNavbar({ onToggleSidebar }: TopNavbarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-30 backdrop-blur-sm bg-white dark:bg-gray-900 bg-opacity-95 dark:bg-opacity-95 border-gray-200 dark:border-gray-700 border-b w-full">
      <div className="flex items-center justify-between px-4 lg:px-6 py-3">
        {/* Left side - Mobile menu button */}
        <div className="flex items-center">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden hover:bg-gray-100 dark:hover:bg-gray-800 -ml-2 p-2 rounded-md text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 dark:text-gray-400"
            aria-label="Toggle sidebar"
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
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Mobile logo - only visible when sidebar is closed */}
          <div className="lg:hidden ml-2">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center bg-emerald-500 rounded-md h-6 w-6">
                <span className="font-bold text-sm text-white">W</span>
              </div>
              <span className="font-bold text-gray-900 text-lg dark:text-white">
                Web Intro
              </span>
            </div>
          </div>
        </div>

        {/* Center - Search bar */}
        <div className="flex-1 mx-auto max-w-2xl">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="h-4 w-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Find something..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block bg-gray-50 dark:bg-gray-800 pl-10 pr-12 py-2 border border-gray-200 dark:border-gray-700 focus:border-transparent focus:ring-2 focus:ring-emerald-500 rounded-md min-w-[20em] w-full text-gray-900 text-sm dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Right side - Navigation links */}
        <div className="flex items-center space-x-4">
          <nav className="sm:flex items-center space-x-6 hidden">
            <a
              href="#"
              className="font-medium text-gray-700 text-sm hover:text-gray-900 dark:hover:text-white dark:text-gray-300 transition-colors"
            >
              API
            </a>
            <a
              href="#"
              className="font-medium text-gray-700 text-sm hover:text-gray-900 dark:hover:text-white dark:text-gray-300 transition-colors"
            >
              Documentation
            </a>
            <a
              href="#"
              className="font-medium text-gray-700 text-sm hover:text-gray-900 dark:hover:text-white dark:text-gray-300 transition-colors"
            >
              Support
            </a>
          </nav>

          {/* Theme toggle */}
          <button
            className="hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-md text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 dark:text-gray-400"
            aria-label="Toggle theme"
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
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          </button>

          {/* Mobile menu button for right side items */}
          <button className="sm:hidden hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-md text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 dark:text-gray-400">
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
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
