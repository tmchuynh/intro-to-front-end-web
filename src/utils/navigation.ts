import fs from "fs";
import path from "path";
import { fallbackNav } from "./fallback";

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
  if (name === "jQuery") {
    return "jQuery"; // Keep jQuery as is
  }
  if (name === "UX-UI-Design") {
    return "UX/UI Design"; // Format UX-UI-Design to UX/UI Design
  }
  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Function to read metadata from MDX files
export async function readMDXMetadata(
  filePath: string,
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
  items: NavigationItem[],
): NavigationSection[] {
  const categories = {
    fundamentals: [] as NavigationItem[],
    developer_tools: [] as NavigationItem[],
    core_technologies: [] as NavigationItem[],
    design: [] as NavigationItem[],
    projects: [] as NavigationItem[],
    utilities: [] as NavigationItem[],
    advanced: [] as NavigationItem[],
    advanced_projects: [] as NavigationItem[],
  };

  items.forEach((item) => {
    const path = item.href.toLowerCase();
    const title = item.title.toLowerCase();

    // Categorize based on path and title
    if (
      path === "/" ||
      path.includes("overview") ||
      path.includes("getting-started") ||
      path.includes("vocabulary") ||
      path.includes("abbreviations")
    ) {
      categories.fundamentals.push(item);
    } else if (
      path.includes("browser-developer-tools") ||
      path.includes("command-line-interface") ||
      path.includes("tools-and-resources-overview") ||
      path.includes("development-environment") ||
      path.includes("git-and-github") ||
      path.includes("hosting-and-deployment") ||
      path.includes("package-managers") ||
      title.includes("development environment") ||
      title.includes("developer tools")
    ) {
      categories.developer_tools.push(item);
    } else if (
      path.includes("advanced") ||
      path.includes("advancing") ||
      path.includes("blog-website") ||
      path.includes("ecommerce-platform") ||
      title.includes("advanced") ||
      title.includes("blog") ||
      title.includes("ecommerce") ||
      title.includes("advancing")
    ) {
      categories.advanced_projects.push(item);
    } else if (
      path.includes("performance") ||
      path.includes("security") ||
      path.includes("storage-solutions") ||
      path.includes("graphql") ||
      path.includes("APIs") ||
      path.includes("frameworks") ||
      path.includes("libraries") ||
      path.includes("typescript") ||
      path.includes("react") ||
      path.includes("next.js") ||
      title.includes("performance") ||
      title.includes("graphql") ||
      title.includes("security") ||
      title.includes("storage") ||
      title.includes("apis") ||
      title.includes("framework") ||
      title.includes("library") ||
      title.includes("typescript") ||
      title.includes("react") ||
      title.includes("next.js") ||
      title.includes("advanced")
    ) {
      categories.advanced.push(item);
    } else if (
      path.includes("seo-accessibility") ||
      path.includes("introduction-to-html") ||
      path.includes("introduction-to-css") ||
      path.includes("introduction-to-javascript") ||
      path.includes("document-object-model") ||
      path.includes("forms") ||
      path.includes("jquery") ||
      title.includes("html") ||
      title.includes("css") ||
      title.includes("javascript") ||
      title.includes("seo") ||
      title.includes("accessibility") ||
      title.includes("dom") ||
      title.includes("forms") ||
      title.includes("jquery")
    ) {
      categories.core_technologies.push(item);
    } else if (
      path.includes("quiz-app") ||
      path.includes("project") ||
      path.includes("website-portfolio") ||
      title.includes("project") ||
      title.includes("portfolio")
    ) {
      categories.projects.push(item);
    } else if (
      path.includes("ux-ui-design") ||
      path.includes("design") ||
      title.includes("design") ||
      title.includes("ux") ||
      title.includes("ui")
    ) {
      categories.design.push(item);
    } else if (
      path.includes("utilities-tools") ||
      path.includes("resources-utilities") ||
      path.includes("helper-functions") ||
      path.includes("development-tools") ||
      path.includes("utility-libraries") ||
      title.includes("utilities") ||
      title.includes("utility") ||
      title.includes("helper") ||
      title.includes("tools")
    ) {
      categories.utilities.push(item);
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

  if (categories.developer_tools.length > 0) {
    sections.push({
      title: "Developer Tools & Resources",
      items: categories.developer_tools,
    });
  }

  if (categories.core_technologies.length > 0) {
    sections.push({
      title: "Core Technologies",
      items: categories.core_technologies,
    });
  }

  if (categories.design.length > 0) {
    sections.push({
      title: "Design",
      items: categories.design,
    });
  }

  if (categories.projects.length > 0) {
    sections.push({
      title: "Projects",
      items: categories.projects,
    });
  }

  if (categories.utilities.length > 0) {
    sections.push({
      title: "Utilities & Tools",
      items: categories.utilities,
    });
  }

  if (categories.advanced.length > 0) {
    sections.push({
      title: "Advanced Topics",
      items: categories.advanced,
    });
  }

  if (categories.advanced_projects.length > 0) {
    sections.push({
      title: "Advanced Projects",
      items: categories.advanced_projects,
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
    return fallbackNav;
  }

  try {
    const appDir = path.join(process.cwd(), "src/app");
    const navigationItems = await scanDirectory(appDir, "");

    // Categorize items into logical sections
    const sections = categorizeNavigationItems(navigationItems);

    return sections;
  } catch {
    return fallbackNav; // Return fallback navigation on error
  }
}

// Helper function to determine priority for sorting navigation items
function getPriority(title: string): number {
  const normalizedTitle = title.toLowerCase();
  if (normalizedTitle.includes("overview")) return 1;
  if (
    normalizedTitle.includes("setting up") ||
    normalizedTitle.includes("set up") ||
    normalizedTitle.includes("getting started") ||
    normalizedTitle.includes("setup")
  )
    return 2;
  if (
    normalizedTitle.includes("introduction") ||
    normalizedTitle.includes("project structure") ||
    normalizedTitle.includes("intro")
  )
    return 3;
  if (normalizedTitle.includes("home")) return 4;

  if (
    normalizedTitle.includes("fundamentals") ||
    normalizedTitle.includes("layouts")
  )
    return 5;
  if (normalizedTitle.includes("vocabulary")) return 6;
  if (
    normalizedTitle.includes("bonus") ||
    normalizedTitle.includes("libraries") ||
    normalizedTitle.includes("frameworks")
  )
    return 9999; // Always at the bottom
  return 999; // Default priority for other items
}

// Helper function to sort navigation items with priority logic
function sortNavigationItems(items: NavigationItem[]): NavigationItem[] {
  return items.sort((a, b) => {
    const priorityA = getPriority(a.title);
    const priorityB = getPriority(b.title);

    // If both have priorities, sort by priority (lower number = higher priority)
    if (priorityA !== 999 || priorityB !== 999) {
      return priorityA - priorityB;
    }

    // Both items have default priority (999), use existing logic
    if (a.order !== undefined && b.order !== undefined) {
      return a.order - b.order;
    }
    if (a.order !== undefined) return -1;
    if (b.order !== undefined) return 1;
    return a.title.localeCompare(b.title);
  });
}

async function scanDirectory(
  dirPath: string,
  basePath: string,
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
          fs.existsSync(path.join(fullPath, file)),
        );

        if (hasPage) {
          // Directory with a page file
          const pageFile = pageFiles.find((file) =>
            fs.existsSync(path.join(fullPath, file)),
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
            item.children = sortNavigationItems(children);
          }

          items.push(item);
        } else {
          // Directory without page file, scan for children
          const children = await scanDirectory(fullPath, routePath);
          if (children.length > 0) {
            items.push({
              title: formatTitle(entry.name),
              href: "#",
              children: sortNavigationItems(children),
            });
          }
        }
      } else if (entry.name === "page.mdx" || entry.name === "page.tsx") {
        // Skip individual page files as they're handled by directory scanning
        continue;
      }
    }

    // Sort items using the helper function
    const sortedItems = sortNavigationItems(items);

    return sortedItems;
  } catch (error) {
    console.error("Error scanning directory:", dirPath, error);
    return [];
  }
}
