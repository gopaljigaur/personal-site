import { GitHubStats } from 'lib/types';

export default async function githubStats():Promise<GitHubStats>{
  try {
    const userResponse = await fetch('https://api.github.com/users/gopaljigaur');
    const userReposResponse = await fetch(
      'https://api.github.com/users/gopaljigaur/repos?per_page=100'
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