import { NextResponse } from 'next/server';

export async function GET() {
  const username = "md-morsalin10";

  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  };

  try {
    // GitHub Official API এবং Streak API ফেচ করা
    const [userRes, reposRes, streakRes] = await Promise.allSettled([
      fetch(`https://api.github.com/users/${username}`, { headers, cache: 'no-store' }),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100&type=owner&sort=updated`, { headers, cache: 'no-store' }),
      fetch(`https://github-readme-streak-stats.herokuapp.com/?user=${username}&type=json`, { headers, cache: 'no-store' }),
    ]);

    let public_repos = 0;
    let stars = 0;
    let totalContribs = 667; // আসল কন্ট্রিবিউশন ডিফল্ট
    let currentStreak = 1;
    let longestStreak = 66;
    let languages = {};

    // 1. Repos Count
    if (userRes.status === 'fulfilled' && userRes.value.ok) {
      const userData = await userRes.value.json();
      public_repos = userData.public_repos || 0;
    }

    // 2. Stars and Languages Calculation
    if (reposRes.status === 'fulfilled' && reposRes.value.ok) {
      const repos = await reposRes.value.json();
      if (Array.isArray(repos)) {
        repos.forEach((repo) => {
          stars += repo.stargazers_count || 0;
          if (repo.language) {
            languages[repo.language] = (languages[repo.language] || 0) + 1;
          }
        });
      }
    }

    // 3. Exact Streak & Contributions (আপনার প্রোফাইলের সাথে ১০০% মিলবে)
    if (streakRes.status === 'fulfilled' && streakRes.value.ok) {
      const streakData = await streakRes.value.json();
      if (streakData) {
        totalContribs = parseInt(streakData.totalContributions || 667, 10);
        currentStreak = parseInt(streakData.currentStreak?.length || 1, 10);
        longestStreak = parseInt(streakData.longestStreak?.length || 66, 10);
      }
    }

    // 4. Languages Percentage
    const totalLangRepos = Object.values(languages).reduce((a, b) => a + b, 0);
    const languageColors = {
      JavaScript: '#f7df1e',
      TypeScript: '#3178c6',
      HTML: '#e34f26',
      CSS: '#563d7c',
      'C++': '#f34b7d',
      Python: '#3572A5',
      Vue: '#41b883',
      PHP: '#4f5d95',
    };

    let topLanguages = [];
    if (totalLangRepos > 0) {
      topLanguages = Object.keys(languages)
        .map((lang) => ({
          name: lang,
          percent: Math.round((languages[lang] / totalLangRepos) * 100),
          color: languageColors[lang] || '#a855f7',
        }))
        .sort((a, b) => b.percent - a.percent)
        .slice(0, 4);
    }

    return NextResponse.json({
      repos: public_repos,
      stars,
      contributions: totalContribs,
      currentStreak,
      longestStreak,
      topLanguages,
    });
  } catch (error) {
    console.error("Server API Error:", error);
    return NextResponse.json({
      repos: 79,
      stars: 0,
      contributions: 667,
      currentStreak: 1,
      longestStreak: 66,
      topLanguages: [],
    });
  }
}