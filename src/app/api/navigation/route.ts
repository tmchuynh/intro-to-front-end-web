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
        title: "Guides",
        items: [
          {
            title: "Welcome",
            href: "/",
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
    ]);
  }
}
