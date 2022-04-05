import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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

  res.setHeader(
    'Cache-Control',
    'public, s-max-age=1200, stale-while-revalidate=600'
  );
  res.setHeader(
    'Content-Type',
    'application/json'
  );
  res.setHeader(
    'X-Content-Type-Options',
    'nosniff'
  );
  return res.status(200).json({
    followers: user.followers,
    stars
  });
}
