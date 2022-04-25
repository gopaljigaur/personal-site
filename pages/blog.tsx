import { useState } from 'react';
import Container from 'components/Container';
import BlogPost from 'components/BlogPost';
import { InferGetStaticPropsType } from 'next';
import { pick } from 'lib/utils';
import { allBlogs } from 'contentlayer/generated';
import fetcher from 'lib/fetcher';
import { SearchIcon } from 'components/SvgIcons';
import fetchPopularItems from 'lib/popular';
import { PopularItem } from 'lib/types';
import useSWR, { SWRConfig } from 'swr';
import fetchAllViews from 'lib/fetchAllViews';

function PopularPosts(){
  const { data } = useSWR<Array<PopularItem>>('/api/blog/popular', fetcher);
  return (
    <>
      {
        data ? (
          (data.length > 0) ? (
            data.map((item) => {
              return (
                <BlogPost
                  key={item.slug}
                  title={item.title}
                  summary={item.summary}
                  slug={item.slug}
                />
              )
            })
          ) : <p className="mb-4 text-gray-600 dark:text-gray-400">No items found.</p>
        ) : <p className="mb-4 text-gray-600 dark:text-gray-400">No items found.</p>
      }
  </>
  )
}

export default function Blog({
  posts, fallback
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [searchValue, setSearchValue] = useState('');
  const filteredBlogPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchValue.toLowerCase())
  );
  return (
    <SWRConfig value={{ fallback }}>
    <Container
      title="Blog"
      description="A collection of my thoughts on programming and tech industry, and some helpful tutorials."
    >
      <div className="flex flex-col items-start justify-center max-w-2xl mx-auto mb-16">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          Blog
        </h1>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          I've been thinking of writing blogs, but haven't started yet. You won't find
          any posts here. But I might start writing sometime soon.
        </p>
        <div className="relative w-full mb-4">
          <input
            aria-label="Search articles"
            type="text"
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search articles"
            className="block w-full px-4 py-2 text-gray-900 bg-white border border-gray-200 rounded-md dark:border-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
          />
          { SearchIcon }
        </div>
        {!searchValue && (
          <>
            <h3 className="mt-8 mb-4 text-2xl font-bold tracking-tight text-black md:text-4xl dark:text-white">
              Most Popular
            </h3>
              <PopularPosts />
          </>
        )}
        <h3 className="mt-8 mb-4 text-2xl font-bold tracking-tight text-black md:text-4xl dark:text-white">
          All Posts
        </h3>
        {!filteredBlogPosts.length && (
          <p className="mb-4 text-gray-600 dark:text-gray-400">
            No posts found.
          </p>
        )}
        {filteredBlogPosts.map((post) => (
          <BlogPost key={post.title} {...post} />
        ))}
      </div>
    </Container>
    </SWRConfig>
  );
}

export async function getStaticProps() {
  const posts = allBlogs
    .map((post) => pick(post, ['slug', 'title', 'summary', 'publishedAt']))
    .sort(
      (a, b) =>
        Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))
    );
    const viewTable = await fetchAllViews('blog');
    const fallbackViews = viewTable.map((entry) => {
      let obj = Object;
      const key = '/api/blog/views/' + entry.slug;
      obj[key] = {
        total: Number(entry.count)
      };
      return (obj)
    });
  const popularItems = await fetchPopularItems('blog', 3);
  return {
    props: {
      posts,
      fallback: {
        '/api/blog/popular': popularItems,
        ...fallbackViews[0]
      }
      },
  revalidate: 60
  };
}
