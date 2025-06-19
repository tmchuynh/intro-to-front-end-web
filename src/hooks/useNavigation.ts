"use client";

import { NavigationSection } from "@/utils/navigation";
import { useEffect, useState } from "react";

export function useNavigation() {
  const [navigation, setNavigation] = useState<NavigationSection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNavigation() {
      try {
        // In client-side, we'll fetch from an API route
        const response = await fetch("/api/navigation");
        if (response.ok) {
          const data = await response.json();
          setNavigation(data);
        } else {
          // Fallback to static navigation
          setNavigation(getStaticNavigation());
        }
      } catch {
        // Fallback to static navigation
        setNavigation(getStaticNavigation());
      } finally {
        setLoading(false);
      }
    }

    loadNavigation();
  }, []);

  return { navigation, loading };
}

// Static fallback navigation
function getStaticNavigation(): NavigationSection[] {
  return [
    {
      title: "Guides",
      items: [
        {
          title: "Overview",
          href: "/",
        },
        {
          title: "Setting Up",
          href: "/setting-up",
        },
        {
          title: "Introduction",
          href: "/introduction",
          children: [
            {
              title: "Vocabulary",
              href: "/introduction/vocabulary",
            },
          ],
        },
        {
          title: "SEO & Accessibility",
          href: "/seo-accessibility",
        },
      ],
    },
  ];
}
