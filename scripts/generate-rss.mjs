import { writeFileSync } from 'fs';
import RSS from 'rss';
import { allProjects } from '../.contentlayer/generated/allProjects.mjs';
import { allMetadata } from '../.contentlayer/generated/allMetadata.mjs';

const personName = allMetadata[1].name;
const site_url = allMetadata[0].site_url;

async function generate() {
  const feed = new RSS({
    title: personName,
    site_url: site_url,
    feed_url: `${site_url}/feed.xml`
  });

  allProjects.map((post) => {
    feed.item({
      title: post.title,
      url: `${site_url}/project/${post.slug}`,
      description: post.summary
    });
  });

  writeFileSync('./public/feed.xml', feed.xml({ indent: true }));
}

generate();
