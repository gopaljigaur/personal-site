import { ProjectCardSmall, ProjectCardBig, ProjectCardSmallTemplate, ProjectCardBigTemplate } from './ProjectCards';
import fetcher from '../lib/fetcher';
import useSWR from 'swr';
import { PopularItem } from '../lib/types';

export default function PopularProjects({ cardSize }) {
  const { data } = useSWR<Array<PopularItem>>('/api/project/popular', fetcher);
  const items = data ? data : null;
  const cardGradients = [
    "from-[#D8B4FE] to-[#818CF8]",
    "from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]",
    "from-[#FDE68A] via-[#FCA5A5] to-[#FECACA]"
  ];
  if(cardSize === 'big') {
    return (
      <>
      {
        items ? (
          (items.length > 0) ? (
            items.map((item, index) => {
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
        ) : (<><ProjectCardBigTemplate /><ProjectCardBigTemplate /><ProjectCardBigTemplate /></>)
      }
    </>
    )
  }
  else {
    return (
      <div className="flex w-full gap-6 flex-col md:flex-row min-h-[10rem]">
        {
          items ? (
            (items.length > 0) ? (
              items.map((item, index) => {
                return (
                  <ProjectCardSmall
                    key={item.slug}
                    title={item.title}
                    slug={item.slug}
                    url={item.url}
                    count={item.count}
                    gradient={cardGradients[index]}
                    popular={true}
                  />
                )
              })
            ) : <p className="mb-4 text-gray-600 dark:text-gray-400">No items found.</p>
        ) : (<><ProjectCardSmallTemplate /><ProjectCardSmallTemplate /><ProjectCardSmallTemplate /></>)
        }
      </div>
    )
  }
}