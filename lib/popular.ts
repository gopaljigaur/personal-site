import prisma from 'lib/prisma';
import { allBlogs, allProjects } from 'contentlayer/generated';
import { PopularItem } from 'lib/types';

export default async function fetchPopularItems (
  type: String, num: Number
):Promise<Array<PopularItem>> {
  let prisma_db;
  let collection;
  if(type === 'blog') {
    prisma_db = prisma.views_blogs;
    collection = allBlogs;
  }
  else if(type === 'project') {
    prisma_db = prisma.views_projects;
    collection = allProjects;
  }
  else{
    throw(new Error('Path not available'))
  }
  try {
      const filter = await prisma_db.findMany({
        take: num,
        orderBy: {
          count: 'desc',
        },
      });
    return filter.map((data) => {
        const slug = data.slug;
        const count = data.count.toString();
        const match = collection.find(el => el['slug'] == slug);
        const title = match.title;
        const summary = match.summary;
        if (type === 'project') {
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
        } else if (type === 'blog') {
          return {
            'slug': slug,
            'count': count,
            'title': title,
            'summary': summary
          };
        }
      });
    }
  catch (e) {
    return([]);
  }
}
