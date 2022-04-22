import Image from 'next/image';
import Link from 'next/link';

import Container from '../components/Container';
import { ArrowIcon } from '../components/SvgIcons';
import personMdx from '../.contentlayer/generated/Metadata/metadata__person.mdx.json';
import fetchPopularItems from '../lib/popular';
import { ProjectCardSmall } from '../components/ProjectCards';

export default function Home({popularItems}) {
  const cardGradients = [
    "from-[#D8B4FE] to-[#818CF8]",
    "from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]",
    "from-[#FDE68A] via-[#FCA5A5] to-[#FECACA]"
  ];
  return (
    <Container>
      <div className="flex flex-col justify-center items-start max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pb-16">
        <div className="flex flex-col-reverse sm:flex-row items-start">
          <div className="flex flex-col pr-16">
            <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-2 text-black dark:text-white">
              { personMdx.name }
            </h1>
            <h2 className="text-gray-700 dark:text-gray-200 mb-4">
              { personMdx.role + ' at '}
              <span className="font-semibold">{ personMdx.organization }</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              { personMdx.short_bio }
            </p>
            <Link href="/about">
              <a className="flex mt-4 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-gray-200 transition-colors">
                More about me
                { ArrowIcon }
              </a>
            </Link>
          </div>
          <div className="w-[80px] sm:w-[176px] relative mb-8 sm:mb-0 mr-auto self-center">
            <Image
              alt={ personMdx.name }
              height={176}
              width={176}
              priority={true}
              src={ personMdx.avatar }
              className="rounded-full bg-gray-200 dark:bg-gray-800 dark:brightness-90 dark:saturate-[0.85] transition"
            />
          </div>
        </div>
        <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-6 mt-16 text-black dark:text-white">
          Popular Projects
        </h3>
        <div className="flex w-full gap-6 flex-col md:flex-row min-h-[10rem]">
        {
          popularItems ? (
            (popularItems.length > 0) ? (
              popularItems.map((item, index) => {
                return (
                  <ProjectCardSmall
                    key={item.slug}
                    title={item.title}
                    slug={item.slug}
                    url={item.url}
                    count={item.count}
                    gradient={cardGradients[index]} />
                )
              })
            ) : <p className="mb-4 text-gray-600 dark:text-gray-400">No items found.</p>
          ) : <p className="mb-4 text-gray-600 dark:text-gray-400">No items found.</p>
        }
        </div>
        <Link href="/projects">
          <a className="flex mt-8 text-gray-600 dark:text-gray-400 leading-7 rounded-lg hover:text-black dark:hover:text-gray-200 transition-all h-6">
            View all projects
            { ArrowIcon }
          </a>
        </Link>
      </div>
    </Container>
  );
}

export async function getStaticProps() {
  const popularItems = await fetchPopularItems('project', 3);
  return {
    props: { popularItems },
    revalidate: 60
  };
}