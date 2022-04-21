import { writeFileSync } from 'fs';
import { allMetadata } from '../.contentlayer/generated/allMetadata.mjs';


const site_url = allMetadata[0].site_url;

async function generate() {
  const robots = `User-agent: *
Sitemap: ${site_url}/sitemap.xml`;

  writeFileSync('public/robots.txt', robots);
}

generate();