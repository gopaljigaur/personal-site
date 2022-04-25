import type { NextApiRequest, NextApiResponse } from 'next';
import fetchViews from 'lib/fetchViews';
import updateViews from 'lib/updateViews';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const valid_connections = ['blog', 'project'];
    const collection = req.query.collection.toString();
    const slug = req.query.slug.toString();
    if (!(valid_connections.includes(collection))) {
      return res.redirect(307, '/404');
    }
    if (req.method === 'POST') {
      const newOrUpdatedViews = await updateViews(collection, slug);
      res.setHeader(
        'Cache-Control',
        'public, max-age=1200, stale-while-revalidate=600'
      );
      res.setHeader(
        'Content-Type',
        'application/json'
      );
      res.setHeader(
        'X-Content-Type-Options',
        'nosniff'
      );
      return res.status(200).json(newOrUpdatedViews);
    }

    if (req.method === 'GET') {
      const views = await fetchViews(collection, slug);
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
    return res.status(500).json({ message: e.message });
  }
}