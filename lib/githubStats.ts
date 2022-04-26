import { GitHubStats } from 'lib/types';
import metadata from 'data/metadata.json';

export default async function githubStats():Promise<GitHubStats>{
  const github_user = (new URL(metadata.github)).pathname;
  const github_url = (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) ?
      `https://${process.env.GITHUB_CLIENT_ID}:${process.env.GITHUB_CLIENT_SECRET}@api.github.com`
      : 'https://api.github.com';
  try {
    const userResponse = await fetch(`${github_url}/users${github_user}`);
    const userReposResponse = await fetch(
      `${github_url}/users${github_user}/repos?per_page=100`
    );

    const user = await userResponse.json();
    const repositories = await userReposResponse.json();

    const mine = repositories.filter((repo) => !repo.fork);
    const stars = mine.reduce((accumulator, repository) => {
      return accumulator + repository['stargazers_count'];
    }, 0);

    return ({
      followers: user.followers,
      stars: stars
    });
  }
  catch (e) {
      throw(new Error("Github rate limit exceeded"));
  }
}