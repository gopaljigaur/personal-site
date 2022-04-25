import prisma from 'lib/prisma';
import { Views } from 'lib/types';

export default async function fetchViews (
  type: String, slug: String
): Promise<Views> {
  let prisma_db;
  if (type === 'blog') {
    prisma_db = prisma.views_blogs;
  } else if (type === 'project') {
    prisma_db = prisma.views_projects;
  }
  const views = await prisma_db.findUnique({
    where: {
      slug
    }
  });
  return({
    total: Number(views.count)
  });
}
