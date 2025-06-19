import { buildNavigationFromFileSystem } from "@/utils/navigation";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const navigation = await buildNavigationFromFileSystem();
    return NextResponse.json(navigation);
  } catch {
    // Return fallback navigation
    return NextResponse.json([
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
          },
          {
            title: "CSS",
            href: "/intro-to-css",
          },
          {
            title: "JavaScript",
            href: "/intro-to-javascript",
          },
          {
            title: "Document Object Model",
            href: "/document-object-model",
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
            title: "TypeScript",
            href: "/typescript",
          },
          {
            title: "Application Programming Interface",
            href: "/application-programming-interface",
          },
          {
            title: "Storage Solutions",
            href: "/storage-solutions",
          },
          {
            title: "Performance",
            href: "/performance",
          },
          {
            title: "Security",
            href: "/security",
          },
        ],
      },
    ]);
  }
}
