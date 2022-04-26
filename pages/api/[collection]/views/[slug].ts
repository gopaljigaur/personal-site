import type { NextApiRequest, NextApiResponse } from 'next';
import fetchViews from 'lib/fetchViews';
import updateViews from 'lib/updateViews';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const collection = req.query.collection.toString();
    const slug = req.query.slug.toString();
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
    return res.status(e.statusCode || 500).json({ error: e.message });
  }
}