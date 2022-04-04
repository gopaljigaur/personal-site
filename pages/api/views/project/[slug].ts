import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const slug = req.query.slug.toString();

    if (req.method === 'POST') {
      const newOrUpdatedViews = await prisma.views_projects.upsert({
        where: { slug },
        create: {
          slug
        },
        update: {
          count: {
            increment: 1
          }
        }
      });

      return res.status(200).json({
        total: newOrUpdatedViews.count.toString()
      });
    }

    if (req.method === 'GET') {
      const views = await prisma.views_projects.findUnique({
        where: {
          slug
        }
      });
      res.setHeader(
        'Cache-Control',
        'public, s-max-age=1200, stale-while-revalidate=600'
      );
      return res.status(200).json({ total: views.count.toString() });
    }
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
