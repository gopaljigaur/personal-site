import { writeFileSync } from 'fs';
import RSS from 'rss';
import { allProjects } from '../.contentlayer/generated/allProjects.mjs';
import { allMetadata } from '../.contentlayer/generated/allMetadata.mjs';

let personName = '';
let site_url = '';

allMetadata.map((file) => {
  if(file.name) {
    personName = file.name;
  }
  if(file.site_url) {
    site_url = file.site_url;
  }
})

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
