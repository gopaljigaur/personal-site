import { createRequire } from "module";
import { allProjects } from '../.contentlayer/generated/allProjects.mjs';
const require = createRequire(import.meta.url);
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
    const filter = await prisma.views_projects.findMany();
    const allSlugs = allProjects.map((data) => {
        return(data.slug);
    })
    filter.map(async function(data) {
            if (!(allSlugs.includes(data.slug)))
            {
                await prisma.views_projects.delete({
                    where: {
                        slug: data.slug,
                    },
                });
            }
        });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });