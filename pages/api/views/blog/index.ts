import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const totalViews = await prisma.views_blogs.aggregate({
      _sum: {
        count: true
      }
    });
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
    return res.status(200).json({ total: totalViews._sum.count.toString() });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
