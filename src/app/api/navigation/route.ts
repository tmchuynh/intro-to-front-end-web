import { buildNavigationFromFileSystem } from "@/utils/navigation";
import { NextResponse } from "next/server";
import { fallbackNav } from "@/utils/fallback";

export async function GET() {
  try {
    const navigation = await buildNavigationFromFileSystem();
    return NextResponse.json(navigation);
  } catch {
    // Return fallback navigation
    return NextResponse.json(fallbackNav);
  }
}
