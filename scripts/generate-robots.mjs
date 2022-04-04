import { writeFileSync } from 'fs';
import { allMetadata } from '../.contentlayer/generated/allMetadata.mjs';

let site_url = '';

allMetadata.map((file) => {
  if(file.site_url) {
    site_url = file.site_url;
  }
})

async function generate() {
  const robots = `User-agent: *
Sitemap: ${site_url}/sitemap.xml`;

  writeFileSync('public/robots.txt', robots);
}

generate();