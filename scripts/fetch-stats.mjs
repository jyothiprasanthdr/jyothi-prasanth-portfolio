// Fetches practice stats server-side at build time and writes src/data/stats.json.
// On failure the previous file is kept (last good data) and marked stale; nothing is ever invented.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const OUT = 'src/data/stats.json';
const LEETCODE_USER = 'jpdr98';
const GITHUB_USER = 'jyothiprasanthdr';

async function fetchLeetCode(username) {
  const query = `query ($u: String!) {
    matchedUser(username: $u) {
      submitStatsGlobal { acSubmissionNum { difficulty count } }
    }
  }`;
  const res = await fetch('https://leetcode.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Referer: 'https://leetcode.com' },
    body: JSON.stringify({ query, variables: { u: username } }),
  });
  const solved = (await res.json()).data.matchedUser.submitStatsGlobal.acSubmissionNum;
  const count = (d) => solved.find((s) => s.difficulty === d).count;
  return { solved: count('All'), easy: count('Easy'), medium: count('Medium'), hard: count('Hard') };
}

async function fetchGitHubContributions(username) {
  const html = await (await fetch(`https://github.com/users/${username}/contributions`)).text();
  const dates = new Map([...html.matchAll(/data-date="([\d-]+)" id="([^"]+)"/g)].map((m) => [m[2], m[1]]));
  const days = [...html.matchAll(/<tool-tip[^>]*for="([^"]+)"[^>]*>([^<]+)<\/tool-tip>/g)]
    .filter((m) => dates.has(m[1]))
    .map((m) => ({ date: dates.get(m[1]), count: Number(/^(\d+)/.exec(m[2])?.[1] ?? 0) }))
    .sort((a, b) => a.date.localeCompare(b.date));
  return { total: days.reduce((sum, d) => sum + d.count, 0), days };
}

async function main() {
  try {
    // #region cell
    const [leetcode, github] = await Promise.all([
      fetchLeetCode(LEETCODE_USER),
      fetchGitHubContributions(GITHUB_USER),
    ]);
    // #endregion cell
    if (github.days.length < 300) throw new Error(`GitHub calendar looked incomplete (${github.days.length} days)`);
    writeFileSync(OUT, JSON.stringify({ fetchedAt: new Date().toISOString(), stale: false, leetcode, github }, null, 2) + '\n');
    console.log(`stats: ${leetcode.solved} solved, ${github.total} contributions`);
  } catch (err) {
    console.warn(`stats fetch failed: ${err.message}`);
    if (existsSync(OUT)) {
      const previous = JSON.parse(readFileSync(OUT, 'utf8'));
      writeFileSync(OUT, JSON.stringify({ ...previous, stale: true }, null, 2) + '\n');
    } else {
      writeFileSync(OUT, JSON.stringify({ fetchedAt: null, stale: true, leetcode: null, github: null }, null, 2) + '\n');
    }
  }
}

main();
