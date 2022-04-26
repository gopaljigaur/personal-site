import type { NextApiRequest, NextApiResponse } from 'next';
import githubStats from 'lib/githubStats';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try{
    const stats = await githubStats();
    res.setHeader(
    'Content-Type',
    'application/json'
    );
    res.setHeader(
    'X-Content-Type-Options',
    'nosniff'
    );
    return res.status(200).json(stats);
  } catch (e) {
    return res.status(e.statusCode || 500).json({ error: e.message });
  }
}
