import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

interface GitHubCachedData {
  username: string;
  avatarUrl: string;
  name: string;
  bio: string;
  publicRepos: number;
  followers: number;
  following: number;
  totalContributions: number;
  currentYearContributions: number;
  languages: { name: string; count: number; percent: number }[];
  contributions: { date: string; count: number; level: number }[];
  timestamp: number;
}

let memoryCache: GitHubCachedData | null = null;
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes

export async function GET() {
  const now = Date.now();

  if (memoryCache && now - memoryCache.timestamp < CACHE_TTL_MS) {
    return NextResponse.json({
      success: true,
      source: "cache",
      data: memoryCache,
    });
  }

  try {
    const headers = {
      "User-Agent": "Sarvani-Portfolio-Activity/1.0",
      Accept: "application/vnd.github.v3+json",
    };

    // Fetch user details and repos in parallel
    const [userRes, reposRes, contribRes] = await Promise.allSettled([
      fetch("https://api.github.com/users/SarvaniVadavalli", { headers }),
      fetch("https://api.github.com/users/SarvaniVadavalli/repos?per_page=100&sort=updated", { headers }),
      fetch("https://github-contributions-api.jogruber.de/v4/SarvaniVadavalli"),
    ]);

    let userData: any = null;
    if (userRes.status === "fulfilled" && userRes.value.ok) {
      userData = await userRes.value.json();
    }

    let reposData: any[] = [];
    if (reposRes.status === "fulfilled" && reposRes.value.ok) {
      const parsed = await reposRes.value.json();
      if (Array.isArray(parsed)) reposData = parsed;
    }

    let contribData: any = null;
    if (contribRes.status === "fulfilled" && contribRes.value.ok) {
      contribData = await contribRes.value.json();
    }

    // Process Languages
    const langCounts: Record<string, number> = {};
    reposData.forEach((repo) => {
      if (repo.language) {
        langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
      }
    });

    const totalLangProjects = Object.values(langCounts).reduce((acc, c) => acc + c, 0);
    const languages = Object.entries(langCounts)
      .map(([name, count]) => ({
        name,
        count,
        percent: totalLangProjects > 0 ? Math.round((count / totalLangProjects) * 100) : 0,
      }))
      .sort((a, b) => b.count - a.count);

    // Process Contributions: extract last 20 weeks (140 days)
    let processedContributions: { date: string; count: number; level: number }[] = [];
    let totalContribs = 0;
    let yearContribs = 0;

    if (contribData && Array.isArray(contribData.contributions)) {
      const allDays = [...contribData.contributions].sort((a: any, b: any) =>
        a.date.localeCompare(b.date)
      );

      if (contribData.total) {
        totalContribs = Object.values(contribData.total as Record<string, number>).reduce(
          (sum: number, val: number) => sum + val,
          0
        );
        yearContribs = contribData.total["2026"] ?? totalContribs;
      }

      // Filter up to today's date or take the last 52 weeks (364 days)
      const todayIso = new Date().toISOString().split("T")[0];
      const daysUpToToday = allDays.filter((d: any) => d.date <= todayIso);
      processedContributions = daysUpToToday.slice(-364);
    }

    // If API limit reached or partial data, ensure we don't crash
    if (!userData && memoryCache) {
      return NextResponse.json({
        success: true,
        source: "stale-cache",
        data: memoryCache,
      });
    }

    const payload: GitHubCachedData = {
      username: userData?.login || "SarvaniVadavalli",
      avatarUrl: userData?.avatar_url || "https://github.com/SarvaniVadavalli.png",
      name: userData?.name || "Sarvani Vadavalli",
      bio: userData?.bio || "",
      publicRepos: userData?.public_repos ?? reposData.length ?? 13,
      followers: userData?.followers ?? 1,
      following: userData?.following ?? 2,
      totalContributions: totalContribs > 0 ? totalContribs : 90,
      currentYearContributions: yearContribs > 0 ? yearContribs : 87,
      languages: languages.length > 0 ? languages : [
        { name: "Python", count: 2, percent: 33 },
        { name: "TypeScript", count: 1, percent: 17 },
        { name: "JavaScript", count: 1, percent: 17 },
        { name: "CSS", count: 1, percent: 17 },
        { name: "HTML", count: 1, percent: 17 },
      ],
      contributions: processedContributions,
      timestamp: now,
    };

    memoryCache = payload;

    return NextResponse.json({
      success: true,
      source: "live",
      data: payload,
    });
  } catch (error: any) {
    if (memoryCache) {
      return NextResponse.json({
        success: true,
        source: "fallback-cache",
        data: memoryCache,
      });
    }
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Failed to fetch GitHub stats",
      },
      { status: 500 }
    );
  }
}

