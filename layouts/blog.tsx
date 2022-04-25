import Image from 'next/image';
import { parseISO, format } from 'date-fns';
import { NextSeo, ArticleJsonLd } from 'next-seo';
import { useTheme } from 'next-themes';
import Script from 'next/script';
import Container from 'components/Container';
import ViewCounter from 'components/ViewCounter';
import type { PropsWithChildren } from 'react';
import type { Blog } from 'contentlayer/generated';
import metadata from '../data/metadata.json';

const editUrl = (slug) =>
  `${metadata.github}/blogs/edit/main/data/blog/${slug}.mdx`;
const discussUrl = (slug) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(
    `${metadata.site_url}/blog/${slug}`
  )}`;

export default function BlogLayout({
  children,
  post
}: PropsWithChildren<{ post: Blog }>) {
  const { resolvedTheme } = useTheme();
  return (
    <>
      <Script id="remark-config">
        {`var remark_config = {
        host: "${process.env.NEXT_PUBLIC_REMARK42_HOST}",
        site_id: "${process.env.NEXT_PUBLIC_REMARK42_SITE_ID}",
        theme: "${resolvedTheme}"
        }`}
      </Script>
      <Script id="remark-init">{`!function(e,n){for(var o=0;o<e.length;o++){var r=n.createElement("script"),c=".js",d=n.head||n.body;"noModule"in r?(r.type="module",c=".mjs"):r.async=!0,r.defer=!0,r.src=remark_config.host+"/web/"+e[o]+c,d.appendChild(r)}}(remark_config.components||["embed"],document);`}</Script>
      <NextSeo
        openGraph={{
          title: post.title,
          description: post.summary,
          url: `${metadata.site_url}/blog/${post.slug}`,
          type: 'article',
          article: {
            publishedTime: (new Date(post.publishedAt)).toISOString(),
            authors: [
              metadata.site_url,
            ],
          },
          images: [
            {
              url: `${metadata.site_url}${post.image}`,
              alt: post.title,
            },
          ],
        }}
      />
      <ArticleJsonLd
        type="Blog"
        url={`${metadata.site_url}/blog/${post.slug}`}
        title={post.title}
        images={[
          `${metadata.site_url}${post.image}`
        ]}
        datePublished={new Date(post.publishedAt).toISOString()}
        authorName={metadata.name}
        description={post.summary}
      />
    <Container
      title={`${post.title}`}
      description={post.summary}
      image={`${metadata.site_url}${post.image}`}
      date={new Date(post.publishedAt).toISOString()}
      type="article"
    >
      <div className="flex flex-col items-start justify-center w-full max-w-2xl mx-auto mb-16">
      <article className="mb-8 w-full">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          {post.title}
        </h1>
        <div className="flex flex-col items-start justify-between w-full mt-2 md:flex-row md:items-center">
          <div className="flex items-center">
            <Image
              alt={metadata.name}
              height={24}
              width={24}
              src={metadata.avatar}
              className="rounded-full bg-gray-200 dark:bg-gray-800 dark:brightness-90 dark:saturate-[0.85]"
            />
            <p className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              {`${metadata.name} / `}
              {format(parseISO(post.publishedAt), 'MMMM dd, yyyy')}
            </p>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 min-w-32 md:mt-0">
            {post.readingTime.text}
            {` • `}
            <ViewCounter slug={post.slug} type={'blog'} />
          </p>
        </div>
        <div className="w-full mt-4 prose dark:prose-dark max-w-none">
          {children}
        </div>
      </article>
      <div className="text-sm text-gray-700 dark:text-gray-300 mb-8">
        <a
          href={editUrl(post.slug)}
          target="_blank"
          rel="noopener noreferrer"
        >
          {'Edit on GitHub'}
        </a>
      </div>
        <h3 className="text-lg">Comments</h3>
        <div id="remark42" className="w-full"></div>
    </div>
    </Container>
    </>
  );
}