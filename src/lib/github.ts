import { Octokit } from 'octokit';

const octokit = new Octokit({
  auth: process.env.GITHUB_ACCESS_TOKEN,
});

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
}

export async function getGitHubRepos(
  username: string,
  limit: number = 6
): Promise<GitHubRepo[]> {
  try {
    const { data } = await octokit.rest.repos.listForUser({
      username,
      sort: 'updated',
      direction: 'desc',
      per_page: limit,
    });

    return data as GitHubRepo[];
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return [];
  }
}

export async function getGitHubUser(username: string) {
  try {
    const { data } = await octokit.rest.users.getByUsername({ username });
    return data;
  } catch (error) {
    console.error('Error fetching GitHub user:', error);
    return null;
  }
}

export async function getGitHubStats(username: string) {
  try {
    const user = await getGitHubUser(username);
    const repos = await getGitHubRepos(username, 100);

    const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
    const totalForks = repos.reduce((acc, repo) => acc + repo.forks_count, 0);
    const languages = new Set<string>();

    repos.forEach((repo) => {
      if (repo.language) {
        languages.add(repo.language);
      }
    });

    return {
      followers: user?.followers || 0,
      publicRepos: user?.public_repos || 0,
      totalStars,
      totalForks,
      languagesCount: languages.size,
      profileUrl: user?.html_url,
    };
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    return null;
  }
}
