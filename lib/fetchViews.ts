import prisma from 'lib/prisma';

export default async function fetchViews (
  type: String, slug: String
) {
  let prisma_db = null;
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
    total: views.count.toString()
  });
}
