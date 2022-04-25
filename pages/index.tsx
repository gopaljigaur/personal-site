import Image from 'next/image';
import Link from 'next/link';
import metadata from 'data/metadata.json';
import Container from 'components/Container';
import { ArrowIcon } from 'components/SvgIcons';
import fetchPopularItems from 'lib/popular';
import { SWRConfig } from 'swr';
import PopularProjects from 'components/PopularProjects';

export default function Home({fallback}) {
  return (
    <SWRConfig value={{ fallback }}>
    <Container>
      <div className="flex flex-col justify-center items-start max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pb-16">
        <div className="flex flex-col-reverse sm:flex-row items-start">
          <div className="flex flex-col pr-16">
            <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-2 text-black dark:text-white">
              { metadata.name }
            </h1>
            <h2 className="text-gray-700 dark:text-gray-200 mb-4">
              { metadata.role + ' at '}
              <span className="font-semibold">{ metadata.organization }</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              { metadata.short_bio }
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
              alt={ metadata.name }
              height={176}
              width={176}
              priority={true}
              src={ metadata.avatar }
              className="rounded-full bg-gray-200 dark:bg-gray-800 dark:brightness-90 dark:saturate-[0.85] transition"
            />
          </div>
        </div>
        <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-6 mt-16 text-black dark:text-white">
          Popular Projects
        </h3>
        <div className="flex w-full gap-6 flex-col md:flex-row min-h-[10rem]">
            <PopularProjects
              cardSize="small"
            />
        </div>
        <Link href="/projects">
          <a className="flex mt-8 text-gray-600 dark:text-gray-400 leading-7 rounded-lg hover:text-black dark:hover:text-gray-200 transition-all h-6">
            View all projects
            { ArrowIcon }
          </a>
        </Link>
      </div>
    </Container>
    </SWRConfig>
  );
}

export async function getStaticProps() {
  const popularItems = await fetchPopularItems('project', 3);
  return {
    props: {
      fallback: {
          '/api/project/popular': popularItems
        }
      },
    revalidate: 60
  };
}