import { NextResponse } from 'next/server';

export async function GET() {
  const username = "md-morsalin10";

  try {
    const [userRes, reposRes, contribRes] = await Promise.allSettled([
      fetch(`https://api.github.com/users/${username}`, { next: { revalidate: 3600 } }),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100&type=owner&sort=updated`, { next: { revalidate: 3600 } }),
      fetch(`https://github-contributions-api.joshmd.esp.br/v4/${username}?y=all`, { next: { revalidate: 3600 } })
    ]);

    let public_repos = 0;
    let stars = 0;
    let totalContribs = 0;
    let languages = {};

    if (userRes.status === 'fulfilled' && userRes.value.ok) {
      const userData = await userRes.value.json();
      public_repos = userData.public_repos || 0;
    }

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

    // Contributions handling safely on the server
    if (contribRes.status === 'fulfilled' && contribRes.value.ok) {
      const contribData = await contribRes.value.json();
      if (contribData && contribData.total) {
        totalContribs = Object.values(contribData.total).reduce((a, b) => a + b, 0);
      }
    }

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
      topLanguages,
    });
  } catch (error) {
    console.error("Server API Error:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}