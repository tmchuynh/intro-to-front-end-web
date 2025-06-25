import fs from "fs";
import path from "path";
import { fallbackNav } from "./fallback";

export interface NavigationItem {
  title: string;
  href: string;
  children?: NavigationItem[];
  icon?: string;
  order?: number;
  isExpanded?: boolean;
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
    utilities: [] as NavigationItem[],
    advanced: [] as NavigationItem[],
    advanced_projects: [] as NavigationItem[],
  };

  // Helper function to categorize an item and its children recursively
  function categorizeItem(item: NavigationItem): string {
    const path = item.href.toLowerCase();
    const title = item.title.toLowerCase();

    // If item has children, check if it's a top-level section that should be categorized as a whole
    if (item.children && item.children.length > 0) {
      // Check for API-related top-level sections
      if (
        path.includes("introduction-to-apis") ||
        path.includes("introduction-to-APIs") ||
        title.includes("introduction to apis") ||
        title.includes("api")
      ) {
        return "advanced";
      }

      // Check for other framework/library sections
      if (
        path.includes("introduction-to-frameworks") ||
        path.includes("introduction-to-typescript") ||
        path.includes("introduction-to-react") ||
        path.includes("introduction-to-next") ||
        title.includes("framework") ||
        title.includes("library") ||
        title.includes("typescript") ||
        title.includes("react") ||
        title.includes("next.js")
      ) {
        return "advanced";
      }

      // Check for core technology sections
      if (
        path.includes("introduction-to-html") ||
        path.includes("introduction-to-css") ||
        path.includes("introduction-to-javascript") ||
        path.includes("document-object-model") ||
        title.includes("html") ||
        title.includes("css") ||
        title.includes("javascript") ||
        title.includes("dom")
      ) {
        return "core_technologies";
      }

      // Check for developer tools sections
      if (
        path.includes("developer-tools") ||
        title.includes("developer tools")
      ) {
        return "developer_tools";
      }

      // Check for design sections
      if (
        path.includes("ux-ui-design") ||
        title.includes("design") ||
        title.includes("ux") ||
        title.includes("ui")
      ) {
        return "design";
      }

      // Check for advanced project sections
      if (
        path.includes("advancing") ||
        path.includes("blog-website") ||
        path.includes("ecommerce-platform") ||
        title.includes("blog") ||
        title.includes("ecommerce") ||
        title.includes("advancing") ||
        path.includes("project") ||
        path.includes("website-portfolio") ||
        title.includes("project") ||
        title.includes("portfolio")
      ) {
        return "advanced_projects";
      }
    }

    // For individual pages or items without children, use original logic
    if (
      path === "/" ||
      (path.includes("overview") &&
        !path.includes("introduction-to-apis") &&
        !path.includes("introduction-to-APIs")) ||
      path.includes("getting-started") ||
      path.includes("vocabulary") ||
      path.includes("abbreviations")
    ) {
      return "fundamentals";
    } else if (
      path.includes("introduction-to-apis") ||
      path.includes("introduction-to-APIs") ||
      path.includes("performance") ||
      path.includes("security") ||
      path.includes("storage-solutions") ||
      path.includes("frameworks") ||
      path.includes("introduction-to-frameworks") ||
      path.includes("libraries") ||
      path.includes("typescript") ||
      path.includes("introduction-to-typescript") ||
      path.includes("react") ||
      path.includes("introduction-to-react") ||
      path.includes("next.js") ||
      path.includes("introduction-to-next") ||
      title.includes("performance") ||
      title.includes("security") ||
      title.includes("storage") ||
      title.includes("apis") ||
      title.includes("api") ||
      title.includes("framework") ||
      title.includes("library") ||
      title.includes("typescript") ||
      title.includes("react") ||
      title.includes("next.js") ||
      title.includes("advanced")
    ) {
      return "advanced";
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
      return "developer_tools";
    } else if (
      path.includes("advancing") ||
      path.includes("blog-website") ||
      path.includes("ecommerce-platform") ||
      title.includes("blog") ||
      title.includes("ecommerce") ||
      title.includes("advancing") ||
      path.includes("project") ||
      path.includes("website-portfolio") ||
      title.includes("project") ||
      title.includes("portfolio")
    ) {
      return "advanced_projects";
    } else if (
      path.includes("seo-accessibility") ||
      path.includes("introduction-to-html") ||
      path.includes("introduction-to-css") ||
      path.includes("introduction-to-javascript") ||
      path.includes("document-object-model") ||
      path.includes("forms") ||
      path.includes("jquery") ||
      path.includes("documentation-and-learning-platforms") ||
      title.includes("html") ||
      title.includes("css") ||
      title.includes("javascript") ||
      title.includes("seo") ||
      title.includes("accessibility") ||
      title.includes("dom") ||
      title.includes("forms") ||
      title.includes("jquery") ||
      title.includes("documentation") ||
      title.includes("learning platforms")
    ) {
      return "core_technologies";
    } else if (
      path.includes("ux-ui-design") ||
      path.includes("design") ||
      title.includes("design") ||
      title.includes("ux") ||
      title.includes("ui")
    ) {
      return "design";
    } else if (
      path.includes("utilities-tools") ||
      path.includes("resources-utilities") ||
      path.includes("helper-functions") ||
      path.includes("development-tools") ||
      path.includes("utility-libraries") ||
      title.includes("utilities") ||
      title.includes("utility") ||
      title.includes("helper") ||
      title.includes("tools") ||
      title.includes("platforms")
    ) {
      return "utilities";
    } else {
      return "fundamentals";
    }
  }

  items.forEach((item) => {
    const category = categorizeItem(item);
    categories[category as keyof typeof categories].push(item);
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
      title: "Projects",
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
    normalizedTitle.includes("security") ||
    normalizedTitle.includes("performance")
  )
    return 999;
  if (
    normalizedTitle.includes("bonus") ||
    normalizedTitle.includes("libraries") ||
    normalizedTitle.includes("frameworks")
  )
    return 9999; // Always at the bottom
  return 99; // Default priority for other items
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

// Function to set expanded state based on current URL
export function setExpandedState(
  sections: NavigationSection[],
  currentPath: string,
): NavigationSection[] {
  const normalizedPath = currentPath.startsWith("/")
    ? currentPath
    : `/${currentPath}`;

  return sections.map((section) => ({
    ...section,
    items: section.items.map((item) =>
      setItemExpandedState(item, normalizedPath),
    ),
  }));
}

function setItemExpandedState(
  item: NavigationItem,
  currentPath: string,
): NavigationItem {
  const shouldExpand = isPathInSubtree(currentPath, item);

  return {
    ...item,
    isExpanded: shouldExpand,
    children: item.children?.map((child) =>
      setItemExpandedState(child, currentPath),
    ),
  };
}

function isPathInSubtree(currentPath: string, item: NavigationItem): boolean {
  // Check if current path matches this item exactly
  if (currentPath === item.href) {
    return true;
  }

  // Check if current path is a child of this item
  if (currentPath.startsWith(item.href + "/")) {
    return true;
  }

  // Check if any children match
  if (item.children) {
    return item.children.some((child) => isPathInSubtree(currentPath, child));
  }

  return false;
}

// Function to get client-side navigation with expanded state
export function getClientSideNavigation(
  currentPath?: string,
): NavigationSection[] {
  if (currentPath) {
    return setExpandedState(fallbackNav, currentPath);
  }
  return fallbackNav;
}
