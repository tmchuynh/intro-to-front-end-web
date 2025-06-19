import fs from "fs";
import path from "path";

export interface NavigationItem {
  title: string;
  href: string;
  children?: NavigationItem[];
  icon?: string;
  order?: number;
}

export interface NavigationSection {
  title: string;
  items: NavigationItem[];
}

// Function to convert file/folder names to display titles
export function formatTitle(name: string): string {
  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Function to read metadata from MDX files
export async function readMDXMetadata(
  filePath: string
): Promise<{ title?: string; order?: number }> {
  try {
    if (typeof window !== "undefined") {
      // Client-side: return empty metadata
      return {};
    }

    const content = fs.readFileSync(filePath, "utf-8");
    const metadata: { title?: string; order?: number } = {};

    // Extract frontmatter (if any)
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---/;
    const match = content.match(frontmatterRegex);

    if (match) {
      const frontmatter = match[1];
      const titleMatch = frontmatter.match(/title:\s*["'](.+)["']/);
      const orderMatch = frontmatter.match(/order:\s*(\d+)/);

      if (titleMatch) metadata.title = titleMatch[1];
      if (orderMatch) metadata.order = parseInt(orderMatch[1]);
    }

    // If no title in frontmatter, look for first h1
    if (!metadata.title) {
      const h1Match = content.match(/^#\s+(.+)$/m);
      if (h1Match) {
        metadata.title = h1Match[1];
      }
    }

    return metadata;
  } catch {
    return {};
  }
}

// Function to categorize pages into logical sections
function categorizeNavigationItems(
  items: NavigationItem[]
): NavigationSection[] {
  const categories = {
    getting_started: [] as NavigationItem[],
    fundamentals: [] as NavigationItem[],
    projects: [] as NavigationItem[],
    advanced: [] as NavigationItem[],
    design: [] as NavigationItem[],
  };

  items.forEach((item) => {
    const path = item.href.toLowerCase();

    // Categorize based on path and title
    if (
      path === "/" ||
      path.includes("overview") ||
      path.includes("setting-up") ||
      path.includes("introduction")
    ) {
      categories.fundamentals.push(item);
    } else if (
      path.includes("application-programming-interface") ||
      path.includes("api") ||
      item.title.toLowerCase().includes("application programming interface") ||
      item.title.toLowerCase().includes("api")
    ) {
      categories.advanced.push(item);
    } else if (
      path.includes("forms") ||
      item.title.toLowerCase().includes("intro")
    ) {
      categories.getting_started.push(item);
    } else if (
      path.includes("seo-accessibility") ||
      path.includes("document-object-model") ||
      path.includes("jquery")
    ) {
      categories.getting_started.push(item);
    } else if (
      path.includes("quiz-app") ||
      path.includes("website-portfolio")
    ) {
      categories.projects.push(item);
    } else if (
      path.includes("react") ||
      path.includes("frameworks") ||
      path.includes("typescript") ||
      path.includes("storage") ||
      path.includes("libraries")
    ) {
      categories.advanced.push(item);
    } else if (path.includes("ux-ui") || path.includes("design")) {
      categories.design.push(item);
    } else {
      // Default to fundamentals for uncategorized items
      categories.fundamentals.push(item);
    }
  });

  // Create sections only if they have items
  const sections: NavigationSection[] = [];

  if (categories.fundamentals.length > 0) {
    sections.push({
      title: "Fundamentals",
      items: categories.fundamentals,
    });
  }

  if (categories.getting_started.length > 0) {
    sections.push({
      title: "Getting Started",
      items: categories.getting_started,
    });
  }

  if (categories.projects.length > 0) {
    sections.push({
      title: "Projects",
      items: categories.projects,
    });
  }

  if (categories.design.length > 0) {
    sections.push({
      title: "Design",
      items: categories.design,
    });
  }

  if (categories.advanced.length > 0) {
    sections.push({
      title: "Advanced Topics",
      items: categories.advanced,
    });
  }

  return sections;
}

// Function to scan the app directory and build navigation structure
export async function buildNavigationFromFileSystem(): Promise<
  NavigationSection[]
> {
  if (typeof window !== "undefined") {
    // Client-side fallback navigation
    return getClientSideNavigation();
  }

  try {
    const appDir = path.join(process.cwd(), "src/app");
    const navigationItems = await scanDirectory(appDir, "");

    // Categorize items into logical sections
    const sections = categorizeNavigationItems(navigationItems);

    return sections;
  } catch {
    return getClientSideNavigation();
  }
}

async function scanDirectory(
  dirPath: string,
  basePath: string
): Promise<NavigationItem[]> {
  const items: NavigationItem[] = [];

  try {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      if (
        entry.name.startsWith(".") ||
        entry.name === "globals.css" ||
        entry.name === "favicon.ico" ||
        entry.name === "layout.tsx"
      ) {
        continue;
      }

      const fullPath = path.join(dirPath, entry.name);
      const routePath = basePath + "/" + entry.name;

      if (entry.isDirectory()) {
        // Check if directory has a page file
        const pageFiles = ["page.tsx", "page.mdx", "page.js"];
        const hasPage = pageFiles.some((file) =>
          fs.existsSync(path.join(fullPath, file))
        );

        if (hasPage) {
          // Directory with a page file
          const pageFile = pageFiles.find((file) =>
            fs.existsSync(path.join(fullPath, file))
          );
          const pagePath = path.join(fullPath, pageFile!);
          const metadata = await readMDXMetadata(pagePath);

          const item: NavigationItem = {
            title: metadata.title || formatTitle(entry.name),
            href: routePath === "/page" ? "/" : routePath,
            order: metadata.order,
          };

          // Check for children
          const children = await scanDirectory(fullPath, routePath);
          if (children.length > 0) {
            item.children = children;
          }

          items.push(item);
        } else {
          // Directory without page file, scan for children
          const children = await scanDirectory(fullPath, routePath);
          if (children.length > 0) {
            items.push({
              title: formatTitle(entry.name),
              href: "#",
              children,
            });
          }
        }
      } else if (entry.name === "page.mdx" || entry.name === "page.tsx") {
        // Skip individual page files as they're handled by directory scanning
        continue;
      }
    }

    // Sort items with special handling for Overview and Setting Up
    items.sort((a, b) => {
      // Define priority order for special items
      const getPriority = (title: string): number => {
        const normalizedTitle = title.toLowerCase();
        if (normalizedTitle.includes("overview")) return 1;
        if (
          normalizedTitle.includes("setting up") ||
          normalizedTitle.includes("setup")
        )
          return 2;
        return 999; // Default priority for other items
      };

      const priorityA = getPriority(a.title);
      const priorityB = getPriority(b.title);

      // If both have special priorities, sort by priority
      if (priorityA !== 999 && priorityB !== 999) {
        return priorityA - priorityB;
      }

      // If only one has special priority, it comes first
      if (priorityA !== 999) return -1;
      if (priorityB !== 999) return 1;

      // For regular items, use existing logic
      if (a.order !== undefined && b.order !== undefined) {
        return a.order - b.order;
      }
      if (a.order !== undefined) return -1;
      if (b.order !== undefined) return 1;
      return a.title.localeCompare(b.title);
    });

    return items;
  } catch (error) {
    console.error("Error scanning directory:", dirPath, error);
    return [];
  }
}

// Client-side fallback navigation
function getClientSideNavigation(): NavigationSection[] {
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
          ],
        },
      ],
    },
    {
      title: "Advanced Topics",
      items: [
        {
          title: "React",
          href: "/react",
          children: [
            {
              title: "Next.js",
              href: "/react/nextjs",
            },
            {
              title: "Remix",
              href: "/react/remix",
            },
          ],
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
        {
          title: "More Advanced Concepts",
          href: "/more-advanced-concepts",
        },
      ],
    },
    {
      title: "Design",
      items: [
        {
          title: "UX/UI Design",
          href: "/UX-UI-Design",
        },
      ],
    },
  ];
}
