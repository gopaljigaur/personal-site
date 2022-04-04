import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/prisma';
import { allBlogs } from 'contentlayer/generated';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const numItems = 3;
    if (req.method === 'GET') {
      const filter = await prisma.views_blogs.findMany({
        take: numItems,
        orderBy: {
            count: 'desc',
          },
      });
      const popularItems = filter.map((data) => {
        const slug = data.slug;
        const count = data.count.toString();
        const match = allBlogs.find(el => el['slug'] == slug);
        const title = match.title;
        const summary = match.summary;
        return {
          'slug': slug,
          'count': count,
          'title': title,
          'summary': summary
        };
      });
      res.setHeader(
        'Cache-Control',
        'public, s-max-age=1200, stale-while-revalidate=600'
      );
      return res.status(200).json( popularItems );
    }
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
