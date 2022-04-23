import Image from 'next/image';

import Container from 'components/Container';
import ViewCounter from 'components/ViewCounter';
import type { PropsWithChildren } from 'react';
import type { Project } from 'contentlayer/generated';
import metaMdx from '../.contentlayer/generated/Metadata/metadata__meta.mdx.json';
import personMdx from '../.contentlayer/generated/Metadata/metadata__person.mdx.json';

const viewUrl = (link) =>
  `${link}`;
const discussUrl = (slug) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(
    `${metaMdx.site_url}/blog/${slug}`
  )}`;

export default function ProjectLayout({
  children,
  post
}: PropsWithChildren<{ post: Project }>) {
  const headScript = {
    "id": "google-article",
    "type": "application/ld+json",
    "script": `{
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": "${post.title}",
      "image": "${metaMdx.site_url}${post.image ? post.image : '/static/images/banner.png'}",
      "datePublished": "${new Date(post.publishedAt).toISOString()}",
      "author": {
        "@type": "Person",
        "name": "${personMdx.name}",
        "url": "${metaMdx.site_url}"
      }
    }`
  }
  const remark_init = {
    "id": "remark_init",
    "type": "application/javascript",
    "script": `!function(e,n){for(var o=0;o<e.length;o++){var r=n.createElement("script"),c=".js",d=n.head||n.body;"noModule"in r?(r.type="module",c=".mjs"):r.async=!0,r.defer=!0,r.src=remark_config.host+"/web/"+e[o]+c,d.appendChild(r)}}(remark_config.components||["embed"],document);`
  }
  return (
    <Container
      title={post.title}
      description={post.summary}
      type="article"
      scripts={[headScript, remark_init]}
    >
      <div className="flex flex-col items-start justify-center w-full max-w-2xl mx-auto mb-16">
      <article className="mb-8 w-full">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          {post.title}
        </h1>
        <div className="flex flex-col items-start justify-between w-full mt-2 md:flex-row md:items-center">
          <div className="flex items-center">
            <Image
              alt={personMdx.name}
              height={24}
              width={24}
              src={personMdx.avatar}
              className="rounded-full bg-gray-200 dark:bg-gray-800 dark:brightness-90 dark:saturate-[0.85]"
            />
            <p className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              {personMdx.name}
            </p>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 min-w-32 md:mt-0">
            <ViewCounter slug={post.slug} type={'project'} />
          </p>
        </div>
        <div className="w-full mt-4 prose dark:prose-dark max-w-none">
          {children}
        </div>
      </article>
      <div className="text-sm text-gray-700 dark:text-gray-300">
        <a
          href={viewUrl(post.url)}
          target="_blank"
          rel="noopener noreferrer"
        >
          {'View project'}
        </a>
        {
          (post.source_url && (post.source_url != post.url)) && (
            <>
              {` • `}
              <a
                href={viewUrl(post.source_url)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {'View source code'}
              </a>
            </>
          )
        }
      </div>
      </div>
    </Container>
  );
}
