import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

interface LeetCodeCachedData {
  username: string;
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  ranking: number;
  acceptanceRate: number;
  totalSubmissions: number;
  acSubmissions: number;
  submissions: { date: string; count: number; level: number }[];
  totalSubmissionDays: number;
  recentSubmissions: {
    title: string;
    status: string;
    lang: string;
    timeAgo?: string;
  }[];
  timestamp: number;
}

let memoryCache: LeetCodeCachedData | null = null;
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes

// Helper to convert calendar map into 52-week (364-day) daily array
function build52WeeksSubmissions(subCalendarRaw: any): {
  days: { date: string; count: number; level: number }[];
  activeDaysCount: number;
} {
  let cal: Record<string, number> = {};
  if (typeof subCalendarRaw === "string") {
    try {
      cal = JSON.parse(subCalendarRaw);
    } catch {
      cal = {};
    }
  } else if (subCalendarRaw && typeof subCalendarRaw === "object") {
    cal = subCalendarRaw;
  }

  // Convert unix timestamps (seconds) to YYYY-MM-DD
  const subMap: Record<string, number> = {};
  Object.entries(cal).forEach(([ts, count]) => {
    const d = new Date(parseInt(ts, 10) * 1000);
    const iso = d.toISOString().split("T")[0];
    subMap[iso] = (subMap[iso] || 0) + Number(count);
  });

  // Build the 364 days (52 weeks) ending today
  const days: { date: string; count: number; level: number }[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 363; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const iso = d.toISOString().split("T")[0];
    const count = subMap[iso] || 0;

    let level = 0;
    if (count >= 10) level = 4;
    else if (count >= 6) level = 3;
    else if (count >= 3) level = 2;
    else if (count >= 1) level = 1;

    days.push({ date: iso, count, level });
  }

  const activeDaysCount = Object.keys(subMap).length;
  return { days, activeDaysCount };
}

export async function GET() {
  const now = Date.now();

  if (memoryCache && now - memoryCache.timestamp < CACHE_TTL_MS) {
    return NextResponse.json({
      success: true,
      source: "cache",
      data: memoryCache,
    });
  }

  let rawCalendar: any = null;
  let user: any = null;
  let allQ: any[] = [];
  let recentSubs: any[] = [];

  // Attempt 1: Official LeetCode GraphQL
  try {
    const gqlRes = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
      body: JSON.stringify({
        query: `
          query userProfileData($username: String!) {
            allQuestionsCount {
              difficulty
              count
            }
            matchedUser(username: $username) {
              username
              profile {
                ranking
                reputation
              }
              userCalendar {
                submissionCalendar
              }
              submitStatsGlobal {
                acSubmissionNum {
                  difficulty
                  count
                  submissions
                }
                totalSubmissionNum {
                  difficulty
                  count
                  submissions
                }
              }
            }
            recentSubmissionList(username: $username, limit: 5) {
              title
              titleSlug
              timestamp
              statusDisplay
              lang
            }
          }
        `,
        variables: { username: "Sarvani_Vadavalli" },
      }),
      signal: AbortSignal.timeout(8000),
    });

    if (gqlRes.ok) {
      const json = await gqlRes.json();
      user = json?.data?.matchedUser;
      allQ = json?.data?.allQuestionsCount || [];
      recentSubs = json?.data?.recentSubmissionList || [];
      rawCalendar = user?.userCalendar?.submissionCalendar;
    }
  } catch (err) {
    console.warn("LeetCode official GraphQL query error, will try fallback proxy...");
  }

  // Attempt 2: If GraphQL didn't return or calendar is missing, fetch from Vercel proxy
  if (!user || !rawCalendar) {
    try {
      const proxyRes = await fetch(
        "https://leetcode-api-faisalshohag.vercel.app/Sarvani_Vadavalli",
        { signal: AbortSignal.timeout(6000) }
      );
      if (proxyRes.ok) {
        const pData = await proxyRes.json();
        if (pData && pData.totalSolved !== undefined) {
          rawCalendar = rawCalendar || pData.submissionCalendar;
          if (!user) {
            user = {
              username: "Sarvani_Vadavalli",
              profile: { ranking: pData.ranking || 833584 },
              submitStatsGlobal: {
                acSubmissionNum: [
                  { difficulty: "All", count: pData.totalSolved, submissions: pData.totalSolved },
                  { difficulty: "Easy", count: pData.easySolved, submissions: pData.easySolved },
                  { difficulty: "Medium", count: pData.mediumSolved, submissions: pData.mediumSolved },
                  { difficulty: "Hard", count: pData.hardSolved, submissions: pData.hardSolved },
                ],
                totalSubmissionNum: pData.totalSubmissions || [
                  { difficulty: "All", submissions: 362 },
                ],
              },
            };
          }
        }
      }
    } catch (err) {
      console.warn("LeetCode proxy fetch failed");
    }
  }

  if (user) {
    const acStats = user.submitStatsGlobal?.acSubmissionNum || [];
    const totalSubStats = user.submitStatsGlobal?.totalSubmissionNum || [];

    const allAc = acStats.find((s: any) => s.difficulty === "All")?.count || 209;
    const easyAc = acStats.find((s: any) => s.difficulty === "Easy")?.count || 90;
    const medAc = acStats.find((s: any) => s.difficulty === "Medium")?.count || 110;
    const hardAc = acStats.find((s: any) => s.difficulty === "Hard")?.count || 9;

    const allTotalQ = allQ.find((q: any) => q.difficulty === "All")?.count || 4101;
    const easyTotalQ = allQ.find((q: any) => q.difficulty === "Easy")?.count || 975;
    const medTotalQ = allQ.find((q: any) => q.difficulty === "Medium")?.count || 2139;
    const hardTotalQ = allQ.find((q: any) => q.difficulty === "Hard")?.count || 987;

    const totalSubs = totalSubStats.find((s: any) => s.difficulty === "All")?.submissions || 362;
    const acSubs = acStats.find((s: any) => s.difficulty === "All")?.submissions || allAc;

    const acceptanceRate =
      totalSubs > 0 ? parseFloat(((acSubs / totalSubs) * 100).toFixed(1)) : 57.7;

    const recent = recentSubs.map((sub: any) => ({
      title: sub.title,
      status: sub.statusDisplay || "Accepted",
      lang: sub.lang || "cpp",
    }));

    const { days: submissionDays, activeDaysCount } = build52WeeksSubmissions(rawCalendar);

    const payload: LeetCodeCachedData = {
      username: "Sarvani_Vadavalli",
      totalSolved: allAc,
      totalQuestions: allTotalQ,
      easySolved: easyAc,
      totalEasy: easyTotalQ,
      mediumSolved: medAc,
      totalMedium: medTotalQ,
      hardSolved: hardAc,
      totalHard: hardTotalQ,
      ranking: user.profile?.ranking || 833584,
      acceptanceRate,
      totalSubmissions: totalSubs,
      acSubmissions: acSubs,
      submissions: submissionDays,
      totalSubmissionDays: activeDaysCount || 79,
      recentSubmissions: recent,
      timestamp: now,
    };

    memoryCache = payload;
    return NextResponse.json({
      success: true,
      source: "live",
      data: payload,
    });
  }

  // If memory cache exists from earlier, return it
  if (memoryCache) {
    return NextResponse.json({
      success: true,
      source: "cached-fallback",
      data: memoryCache,
    });
  }

  return NextResponse.json(
    {
      success: false,
      error: "LeetCode public data temporarily unavailable",
    },
    { status: 503 }
  );
}
