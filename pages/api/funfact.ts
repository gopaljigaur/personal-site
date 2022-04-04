import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const apiResponse = await fetch('https://api.chucknorris.io/jokes/random?category=dev');

  const funFact = await apiResponse.json();

  return res.status(200).json({
    fact: funFact.value
  });
}
