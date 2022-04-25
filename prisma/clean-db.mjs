import { createRequire } from "module";
import { allProjects } from '../.contentlayer/generated/allProjects.mjs';
import { allBlogs } from '../.contentlayer/generated/allBlogs.mjs';
const require = createRequire(import.meta.url);
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const collections = [
  {
    prisma_conn: prisma.views_projects,
    local_collection: allProjects
  },
  {
    prisma_conn: prisma.views_blogs,
    local_collection: allBlogs
  }
]
async function main() {
  collections.map(async (collection) => {
    const filter = await collection.prisma_conn.findMany();
    const allSlugs = collection.local_collection.map((data) => {
      return(data.slug);
    })
    filter.map(async function(data) {
      if (!(allSlugs.includes(data.slug)))
      {
        try{
          await collection.prisma_conn.delete({
            where: {
              slug: data.slug,
            },
          });
        }
        catch (e) {
          console.log(`Error: ${e}`);
        }
      }
    });
  })
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });