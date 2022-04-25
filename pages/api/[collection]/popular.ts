import type { NextApiRequest, NextApiResponse } from 'next';
import fetchPopularItems from 'lib/popular';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const valid_connections = ['blog', 'project'];
    const collection = req.query.collection.toString();
    if (!(valid_connections.includes(collection))) {
      return res.redirect(307, '/404');
    }
    if (req.method === 'GET') {
      const popularItems = await fetchPopularItems(collection, 3);
      res.setHeader(
        'Content-Type',
        'application/json'
      );
      res.setHeader(
        'X-Content-Type-Options',
        'nosniff'
      );
      return res.status(200).json(popularItems);
    }
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
