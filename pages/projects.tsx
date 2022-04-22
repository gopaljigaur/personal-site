import { useState } from 'react';

import Container from 'components/Container';
import { ProjectCardBig } from 'components/ProjectCards';
import { InferGetStaticPropsType } from 'next';
import { pick } from 'lib/utils';
import { allProjects } from 'contentlayer/generated';
import { SearchIcon } from 'components/SvgIcons';
import fetchPopularItems from '../lib/popular';

export default function Projects({
  projectItems, popularItems
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [searchValue, setSearchValue] = useState('');
  const filteredProjectCards = projectItems.filter((projectItem) =>
     projectItem.title.toLowerCase().includes(searchValue.toLowerCase()) ||
    projectItem.summary.toLowerCase().includes(searchValue.toLowerCase()) ||
    projectItem.logo.split(".")[0].toLowerCase().includes(searchValue.toLowerCase())
  );
  const cardGradients = [
    "from-[#D8B4FE] to-[#818CF8]",
    "from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]",
    "from-[#FDE68A] via-[#FCA5A5] to-[#FECACA]"
  ];
  return (
    <Container
      title="Projects"
      description="A collection of my personal projects."
    >
      <div className="flex flex-col items-start justify-center max-w-2xl mx-auto mb-16">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          Projects
        </h1>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          {`Most of these are hobby projects related to web development and machine learning.
           In total, there are ${projectItems.length} projects listed on this page.`}
        </p>
        <div className="relative w-full mb-4">
          <input
            aria-label="Search"
            type="text"
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search"
            className="block w-full px-4 py-2 text-gray-900 bg-white border border-gray-200 rounded-md dark:border-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
          />
          { SearchIcon }
        </div>
        {!searchValue && (
          <>
            <h3 className="mt-8 mb-6 text-2xl font-bold tracking-tight text-black md:text-4xl dark:text-white">
              Most Popular
            </h3>
            {
              popularItems ? (
                (popularItems.length > 0) ? (
                  popularItems.map((item, index) => {
                    return (
                      <ProjectCardBig
                        key={item.slug}
                        title={item.title}
                        summary={item.summary}
                        slug={item.slug}
                        logo={item.logo}
                        url={item.url}
                        {
                          ...{
                            popular: true,
                            gradient: cardGradients[index],
                            count: item.count
                          }
                        }
                      />
                    )
                  })
                ) : <p className="mb-4 text-gray-600 dark:text-gray-400">No items found.</p>
              ) : <p className="mb-4 text-gray-600 dark:text-gray-400">No items found.</p>
            }
          </>
        )}
        <h3 className="mt-16 mb-6 text-2xl font-bold tracking-tight text-black md:text-4xl dark:text-white">
          All Projects
        </h3>
        {!filteredProjectCards.length && (
          <p className="mb-4 text-gray-600 dark:text-gray-400">
            No items found.
          </p>
        )}
        {
          filteredProjectCards.map((projectItem, index) => (
          <ProjectCardBig key={projectItem.title} {...{gradient: cardGradients[index % 3]}} {...projectItem} />
        ))
        }
      </div>
    </Container>
  );
}

export async function getStaticProps() {
  const projectItems = allProjects
    .map((projectItem) => pick(projectItem, ['slug', 'title', 'summary', 'logo', 'url']));
  const popularItems = await fetchPopularItems('project', 3);
  return {
    props: { projectItems, popularItems },
    revalidate: 60
  };
}
