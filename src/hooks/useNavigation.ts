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
      title: "Fundamentals",
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
          title: "HTML",
          href: "/html",
        },
        {
          title: "CSS",
          href: "/css",
        },
        {
          title: "JavaScript",
          href: "/javascript",
        },
        {
          title: "Forms",
          href: "/forms",
        },
        {
          title: "SEO & Accessibility",
          href: "/seo-accessibility",
        },
        {
          title: "Document Object Model",
          href: "/document-object-model",
        },
        {
          title: "jQuery",
          href: "/jquery",
        },
      ],
    },
    {
      title: "Projects",
      items: [
        {
          title: "Quiz App",
          href: "/quiz-app",
        },
        {
          title: "Website Portfolio",
          href: "/website-portfolio",
        },
      ],
    },
    {
      title: "Advanced Topics",
      items: [
        {
          title: "React",
          href: "/react",
        },
        {
          title: "Frameworks",
          href: "/frameworks",
        },
        {
          title: "TypeScript",
          href: "/typescript",
        },
        {
          title: "Application Programming Interface",
          href: "/api",
        },
        {
          title: "Storage Solutions",
          href: "/storage",
        },
        {
          title: "Libraries",
          href: "/libraries",
        },
      ],
    },
  ];
}
