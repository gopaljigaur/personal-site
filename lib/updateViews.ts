import prisma from 'lib/prisma';
import { Views } from 'lib/types';

export default async function updateViews (
  type: String, slug: String
): Promise<Views> {
  let prisma_db;
  if (type === 'blog') {
    prisma_db = prisma.views_blogs;
  } else if (type === 'project') {
    prisma_db = prisma.views_projects;
  }
  else{
    throw(new Error('Path not available'))
  }
  const views = await prisma_db.upsert({
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
  if(views)
    return({
      total: Number(views.count)
    });
  else{
    throw(new Error('Path not available'))
  }
}