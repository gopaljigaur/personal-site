import Link from 'next/link';
import useSWR from 'swr';

import fetcher from 'lib/fetcher';
import { Views } from 'lib/types';
import type { Project } from 'contentlayer/generated';
import cn from 'classnames';
import Image from 'next/image';
import { FollowLink, ViewIcon } from './SvgIcons';

export function ProjectCardSmall({ title, slug, gradient, url, count }) {
  const { data } = useSWR<Views>(`/api/views/project/${slug}`, fetcher);
  const views = count ? count : data?.total;
  return (
    <div className="flex w-full relative">
      <a
        className={cn("peer h-6 w-6 z-10 top-4 right-4 absolute text-gray-900 dark:text-gray-100 hover:scale-[1.4] transition-transform")}
        href={url}
        aria-label={title}
        title="View project"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FollowLink className="h-full w-full"/>
      </a>
      <Link href={`/project/${slug}`}>
      <a
        className={cn(
          'transform hover:scale-[1.01] transition-all',
          'rounded-xl w-full bg-gradient-to-r p-1',
          gradient
        )}
      >
        <div className="flex flex-col justify-between h-full bg-white dark:bg-gray-900 rounded-lg p-4">
          <div className="flex flex-col md:flex-row justify-between">
            <h4 className="text-lg md:text-lg font-medium mb-6 sm:mb-10 w-full text-gray-900 dark:text-gray-100 pr-7 tracking-tight">
              {title}
            </h4>
          </div>
          <div className="flex items-center text-gray-800 dark:text-gray-200 capsize">
            { ViewIcon }
            <span className="ml-2 align-baseline capsize">
              {
                views > 0 ?
                  Number(views).toLocaleString() :
                  <div className="animate-pulse h-5 w-8 rounded-lg bg-gray-200 dark:bg-gray-700">&nbsp;</div>
              }
            </span>
          </div>
        </div>
      </a>
    </Link>
    </div>
  );
}

export function ProjectCardBig({
  title,
  summary,
  slug,
  logo,
  url,
  ...props
}: Pick<Project, 'title' | 'summary' | 'slug'  | 'logo' | 'url'>) {
  const { data, error } = useSWR<Views>(`/api/views/project/${slug}`, fetcher);
  // @ts-ignore
  const views = props.count ? props.count : data?.total;
  let cardClasses = 'rounded-xl w-full mb-4 bg-gray-200 dark:bg-gray-700 peer-hover:bg-gradient-to-r hover:bg-gradient-to-r p-1 transform';
  // @ts-ignore
  if(props.popular) {
    cardClasses = 'rounded-xl w-full mb-4 bg-gradient-to-r p-1 transform peer-hover:scale-[1.01] hover:scale-[1.01] transition-transform';
  }
  return (
    <div className="flex w-full relative">
      <a
        className={cn("peer h-6 w-6 z-10 top-4 right-4 absolute text-gray-900 dark:text-gray-100 hover:scale-[1.4] transition-all")}
        href={url}
        aria-label={title}
        title="View project"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FollowLink className="h-full w-full"/>
      </a>
    <Link href={`/project/${slug}`}>
      <a
        className={cn(
          cardClasses,
          // @ts-ignore
          props.gradient
        )}
      >
        <div className="flex flex-col justify-between h-full bg-white dark:bg-gray-900 rounded-lg p-4">
          <div className="flex flex-col md:flex-row text-gray-900 dark:text-gray-100 justify-between">
            <h4 className="text-lg md:text-lg pt-2 font-medium mt-14 sm:mt-0 mb-2 sm:mb-8 w-full tracking-tight pl-0.5 sm:pl-16 pr-0.5 sm:pr-20">
              {title}
            </h4>
          </div>
          <div className="absolute">
            <Image
              alt={logo[0].toUpperCase()}
              height={48}
              width={48}
              priority={true}
              src={`/static/logos/${logo}`}
              className="rounded-full bg-gray-200 dark:bg-gray-800"
            />
          </div>
          <p className="text-gray-600 dark:text-gray-400 pr-0.5 sm:pr-10">{summary}</p>
          <div className="flex items-center justify-end text-gray-800 dark:text-gray-200 capsize">
            { ViewIcon }
            <span className="ml-2 align-baseline capsize">
              {
                error ?
                  '---' :
                  (
                    views ?
                      Number(views).toLocaleString() :
                      <div className="animate-pulse h-5 w-8 rounded-lg bg-gray-200 dark:bg-gray-700">&nbsp;</div>
                  )
              }
            </span>
          </div>
        </div>
      </a>
    </Link>
    </div>
  );
}

export function ProjectCardSmallTemplate() {
  return (
    <div className="animate-pulse h-32 md:h-48 flex w-full relative">
      <div className="rounded-xl w-full p-1 bg-gray-200 dark:bg-gray-700" >
        <div className="w-full h-full rounded-lg bg-gray-100 dark:bg-gray-800" />
      </div>
    </div>
  );
}

export function ProjectCardBigTemplate() {
  return (
    <div className="animate-pulse h-52 sm:h-44 md:h-36 flex w-full relative mb-4">
      <div className="rounded-xl w-full p-1 bg-gray-200 dark:bg-gray-700" >
        <div className="w-full h-full rounded-lg bg-gray-100 dark:bg-gray-800" />
      </div>
    </div>
  );
}
