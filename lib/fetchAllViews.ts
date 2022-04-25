import prisma from 'lib/prisma';
import { ViewsEntry } from 'lib/types';

export default async function fetchAllViews (
  type: String
): Promise<Array<ViewsEntry>> {
  let prisma_db;
  if (type === 'blog') {
    prisma_db = prisma.views_blogs;
  } else if (type === 'project') {
    prisma_db = prisma.views_projects;
  }
  const table = await prisma_db.findMany({
    select: {
      slug: true,
      count: true
    }
  });
  return(
    table
  );
}
