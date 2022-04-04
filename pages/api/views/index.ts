import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const totalBlogViews = await prisma.views_blogs.aggregate({
      _sum: {
        count: true
      }
    });

    const totalProjectViews = await prisma.views_projects.aggregate({
      _sum: {
        count: true
      }
    });
    let totalViews = 0;
    if(totalBlogViews._sum.count){
      totalViews += parseInt(totalBlogViews._sum.count.toString());
    }
    if(totalProjectViews._sum.count){
      totalViews += parseInt(totalProjectViews._sum.count.toString());
    }
    res.setHeader(
      'Cache-Control',
      'public, s-max-age=1200, stale-while-revalidate=600'
    );
    return res.status(200).json({ total: totalViews.toString() });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
