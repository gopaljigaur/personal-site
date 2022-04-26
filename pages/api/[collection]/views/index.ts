import type { NextApiRequest, NextApiResponse } from 'next';
import totalViews from 'lib/totalViews';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const collection = req.query.collection.toString();
    if (req.method === 'GET') {
      const views = await totalViews(collection);
      res.setHeader(
        'Content-Type',
        'application/json'
      );
      res.setHeader(
        'X-Content-Type-Options',
        'nosniff'
      );
      return res.status(200).json(views);
    }
  } catch (e) {
    return res.status(e.statusCode || 500).json({ error: e.message });
  }
}
