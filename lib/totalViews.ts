import prisma from 'lib/prisma';
import { Views } from 'lib/types';

async function BlogViews(){
  const totalBlogViews = await prisma.views_blogs.aggregate({
    _sum: {
      count: true
    }
  });
  return(totalBlogViews._sum.count);
}

async function ProjectViews(){
  const totalProjectViews = await prisma.views_projects.aggregate({
    _sum: {
      count: true
    }
  });
  return(totalProjectViews._sum.count);
}
export default async function totalViews(collection: string): Promise<Views>{
  if (collection === 'blog') {
    const views = await BlogViews();
    return({
      total: Number(views ? views.toString() : '0')
    });
  } else if (collection === 'project') {
    const views = await ProjectViews();
    return({
      total: Number(views ? views.toString() : '0')
    });
  } else if (collection === 'all') {
    const blog_views = await BlogViews();
    const project_views = await ProjectViews();
    return({
      total: Number(parseInt((blog_views ? blog_views.toString() : '0')) + parseInt((project_views ? project_views.toString() : '0').toString()))
    });
  }
}