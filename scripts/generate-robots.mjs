import { writeFileSync } from 'fs';
import metadata from '../data/metadata.json';


const site_url = metadata.site_url;

async function generate() {
  const robots = `User-agent: *
Sitemap: ${site_url}/sitemap.xml`;

  writeFileSync('public/robots.txt', robots);
}

generate();