import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/prisma';
import { allProjects } from 'contentlayer/generated';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const numItems = 3;
    if (req.method === 'GET') {
      const filter = await prisma.views_projects.findMany({
        take: numItems,
        orderBy: {
            count: 'desc',
          },
      });
      const popularItems = filter.map((data) => {
        const slug = data.slug;
        const count = data.count.toString();
        const match = allProjects.find(el => el['slug'] == slug);
        const title = match.title;
        const summary = match.summary;
        const logo = match.logo;
        const url = match.url;
        return {
          'slug': slug,
          'count': count,
          'title': title,
          'summary': summary,
          'logo': logo,
          'url': url
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
