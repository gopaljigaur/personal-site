import { writeFileSync } from 'fs';
import RSS from 'rss';
import { allProjects } from '../.contentlayer/generated/allProjects.mjs';
import { allBlogs } from '../.contentlayer/generated/allBlogs.mjs';
import metadata from '../data/metadata.json';

const personName = metadata.name;
const site_url = metadata.site_url;

async function generate() {
  const feed = new RSS({
    title: personName,
    site_url: site_url,
    feed_url: `${site_url}/feed.xml`
  });
  const posts = allBlogs.concat(allProjects)
    .sort(
    (a, b) =>
      Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))
  );
  posts.map((post) => {
    feed.item({
      title: post.title,
      url: `${site_url}/${post.type.toLowerCase()}/${post.slug}`,
      description: post.summary,
      date: new Date(post.publishedAt).toISOString()
    });
  });

  writeFileSync('./public/feed.xml', feed.xml({ indent: true }));
}

generate();
