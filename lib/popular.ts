import prisma from 'lib/prisma';
import { allBlogs } from 'contentlayer/generated';
import { allProjects } from 'contentlayer/generated';

export default async function fetchPopularItems (
  type: String, num: Number
) {
  let prisma_db = null;
  let collection = null;
  if(type === 'blog') {
    prisma_db = prisma.views_blogs;
    collection = allBlogs;
  }
  else if(type === 'project') {
    prisma_db = prisma.views_projects;
    collection = allProjects;
  }
  try {
      const filter = await prisma_db.findMany({
        take: num,
        orderBy: {
          count: 'desc',
        },
      });
      const popularItems = filter.map((data) => {
        const slug = data.slug;
        const count = data.count.toString();
        const match = collection.find(el => el['slug'] == slug);
        const title = match.title;
        const summary = match.summary;
        if( type === 'project' ){
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
        }
        else if ( type === 'blog' ){
          return {
            'slug': slug,
            'count': count,
            'title': title,
            'summary': summary
          };
        }
      });
      return popularItems;
    }
  catch (e) {
    return([]);
  }
}
