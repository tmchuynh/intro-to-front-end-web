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
          title: "Getting Started",
          href: "/getting-started",
          children: [
            {
              title: "Need To Knows",
              href: "/getting-started/need-to-knows",
            },
            {
              title: "Best Coding Practices",
              href: "/getting-started/best-coding-practices",
            },
            {
              title: "Accessibility Fundamentals",
              href: "/getting-started/accessibility-fundamentals",
            },
          ],
        },
        {
          title: "Vocabulary",
          href: "/vocabulary",
        },
        {
          title: "Abbreviations",
          href: "/abbreviations",
        },
      ],
    },
    {
      title: "Developer Tools & Resources",
      items: [
        {
          title: "Developer Tools & Resources",
          href: "/developer-tools-and-resources",
          children: [
            {
              title: "Browser Developer Tools",
              href: "/developer-tools-and-resources/browser-developer-tools",
            },
            {
              title: "Command Line Interface",
              href: "/developer-tools-and-resources/command-line-interface",
            },
            {
              title: "Git and Github",
              href: "/developer-tools-and-resources/git-and-github",
            },
            {
              title: "Hosting and Deployment",
              href: "/developer-tools-and-resources/hosting-and-deployment",
            },
            {
              title: "Package Managers",
              href: "/developer-tools-and-resources/package-managers",
            },
          ],
        },
      ],
    },
    {
      title: "Core Technologies",
      items: [
        {
          title: "SEO & Accessibility",
          href: "/seo-accessibility",
        },
        {
          title: "HTML",
          href: "/intro-to-html",
          children: [
            {
              title: "Overview",
              href: "/intro-to-html/overview",
            },
            {
              title: "Semantic HTML",
              href: "/intro-to-html/semantic-html",
            },
            {
              title: "HTML Templates",
              href: "/intro-to-html/html-templates",
            },
            {
              title: "Element Hierarchy",
              href: "/intro-to-html/element-hierarchy",
            },
            {
              title: "Elements and Attributes",
              href: "/intro-to-html/elements-and-attributes",
            },
            {
              title: "Style Elements",
              href: "/intro-to-html/style-elements",
            },
          ],
        },
        {
          title: "CSS",
          href: "/intro-to-css",
          children: [
            {
              title: "Selectors",
              href: "/intro-to-css/selectors",
            },
            {
              title: "Responsive Design",
              href: "/intro-to-css/responsive-design",
            },
            {
              title: "Frameworks",
              href: "/intro-to-css/frameworks",
            },
            {
              title: "Debugging",
              href: "/intro-to-css/debugging",
            },
          ],
        },
        {
          title: "JavaScript",
          href: "/intro-to-javascript",
          children: [
            {
              title: "Data Types",
              href: "/intro-to-javascript/data-types",
            },
            {
              title: "Functions Objects",
              href: "/intro-to-javascript/functions-objects",
            },
            {
              title: "ES6 Features",
              href: "/intro-to-javascript/es6-features",
            },
            {
              title: "Browser APIs",
              href: "/intro-to-javascript/browser-apis",
            },
          ],
        },
        {
          title: "Document Object Model",
          href: "/document-object-model",
          children: [
            {
              title: "Manipulation",
              href: "/document-object-model/manipulation",
            },
            {
              title: "Events",
              href: "/document-object-model/events",
            },
          ],
        },
        {
          title: "Forms",
          href: "/forms",
        },
        {
          title: "jQuery",
          href: "/jQuery",
        },
      ],
    },
    {
      title: "Design",
      items: [
        {
          title: "UX/UI Design",
          href: "/UX-UI-Design",
          children: [
            {
              title: "Wireframing",
              href: "/UX-UI-Design/wireframing",
            },
            {
              title: "Design Trends",
              href: "/UX-UI-Design/design-trends",
            },
            {
              title: "Typography",
              href: "/UX-UI-Design/typography",
            },
          ],
        },
      ],
    },
    {
      title: "Projects",
      items: [
        {
          title: "Quiz App",
          href: "/quiz-app",
          children: [
            {
              title: "Part 1",
              href: "/quiz-app/part-1",
            },
            {
              title: "Part 2",
              href: "/quiz-app/part-2",
            },
            {
              title: "Part 3",
              href: "/quiz-app/part-3",
            },
          ],
        },
        {
          title: "Website Portfolio",
          href: "/website-portfolio",
          children: [
            {
              title: "Part 1",
              href: "/website-portfolio/part-1",
            },
            {
              title: "Part 2",
              href: "/website-portfolio/part-2",
            },
          ],
        },
      ],
    },
    {
      title: "Advanced Topics",
      items: [
        {
          title: "Performance",
          href: "/performance",
        },
        {
          title: "Security",
          href: "/security",
        },
        {
          title: "Storage Solutions",
          href: "/storage-solutions",
        },
        {
          title: "Application Programming Interface",
          href: "/application-programming-interface",
          children: [
            {
              title: "APIs",
              href: "/application-programming-interface/APIs",
            },
            {
              title: "Content Delivery Networks",
              href: "/application-programming-interface/content-delivery-networks",
            },
          ],
        },
        {
          title: "Frameworks",
          href: "/frameworks",
        },
        {
          title: "Libraries",
          href: "/libraries",
        },
        {
          title: "TypeScript",
          href: "/typescript",
        },
        {
          title: "React",
          href: "/react",
          children: [
            {
              title: "Overview",
              href: "/react/overview",
            },
            {
              title: "Next.js Overview",
              href: "/react/nextjs/overview",
            },
            {
              title: "Next.js Components",
              href: "/react/nextjs/components",
            },
            {
              title: "Next.js Routing",
              href: "/react/nextjs/routing",
            },
            {
              title: "Remix",
              href: "/react/remix",
            },
          ],
        },
      ],
    },
  ];
}
