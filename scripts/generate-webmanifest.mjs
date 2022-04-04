import { writeFileSync } from 'fs';
import { allMetadata } from '../.contentlayer/generated/allMetadata.mjs';

let personName = '';
let site_url = '';
let description = '';
allMetadata.map((file) => {
  if(file.name) {
    personName = file.name;
  }
  if(file.site_url) {
    site_url = file.site_url;
  }
  if(file.meta_description) {
    description = file.meta_description;
  }
})

const domainName = (new URL(site_url)).hostname;

async function generate() {
  const dark_webmanifest = `{
 "name": "${personName}",
  "short_name": "${site_url}",
  "description": "${description}",
 "icons": [
  {
   "src": "/static/favicons/dark/android-icon-36x36.png",
   "sizes": "36x36",
   "type": "image/png",
   "density": "0.75"
  },
  {
   "src": "/static/favicons/dark/android-icon-48x48.png",
   "sizes": "48x48",
   "type": "image/png",
   "density": "1.0"
  },
  {
   "src": "/static/favicons/dark/android-icon-72x72.png",
   "sizes": "72x72",
   "type": "image/png",
   "density": "1.5"
  },
  {
   "src": "/static/favicons/dark/android-icon-96x96.png",
   "sizes": "96x96",
   "type": "image/png",
   "density": "2.0"
  },
  {
   "src": "/static/favicons/dark/android-icon-144x144.png",
   "sizes": "144x144",
   "type": "image/png",
   "density": "3.0"
  },
  {
   "src": "/static/favicons/dark/android-icon-192x192.png",
   "sizes": "192x192",
   "type": "image/png",
   "density": "4.0"
  },
  {
   "src": "/static/favicons/dark/android-icon-512x512.png",
   "sizes": "512x512",
   "type": "image/png",
   "density": "4.0"
  }
 ],
  "background_color": "#000000",
  "theme_color": "#000000",
  "display": "standalone",
  "dir": "ltr",
  "lang": "en-US",
  "orientation": "portrait-primary",
  "start_url": "../../../index.html"
}`;

  const light_webmanifest = `{
 "name": "${personName}",
  "short_name": "${site_url}",
  "description": "${description}",
 "icons": [
  {
   "src": "/static/favicons/light/android-icon-36x36.png",
   "sizes": "36x36",
   "type": "image/png",
   "density": "0.75"
  },
  {
   "src": "/static/favicons/light/android-icon-48x48.png",
   "sizes": "48x48",
   "type": "image/png",
   "density": "1.0"
  },
  {
   "src": "/static/favicons/light/android-icon-72x72.png",
   "sizes": "72x72",
   "type": "image/png",
   "density": "1.5"
  },
  {
   "src": "/static/favicons/light/android-icon-96x96.png",
   "sizes": "96x96",
   "type": "image/png",
   "density": "2.0"
  },
  {
   "src": "/static/favicons/light/android-icon-144x144.png",
   "sizes": "144x144",
   "type": "image/png",
   "density": "3.0"
  },
  {
   "src": "/static/favicons/light/android-icon-192x192.png",
   "sizes": "192x192",
   "type": "image/png",
   "density": "4.0"
  },
  {
   "src": "/static/favicons/light/android-icon-512x512.png",
   "sizes": "512x512",
   "type": "image/png",
   "density": "4.0"
  }
 ],
  "background_color": "#ffffff",
  "theme_color": "#ffffff",
  "display": "standalone",
  "dir": "ltr",
  "lang": "en-US",
  "orientation": "portrait-primary",
  "start_url": "../../../index.html"
}`;
  writeFileSync('public/static/favicons/light/manifest.json', light_webmanifest);
  writeFileSync('public/static/favicons/dark/manifest.json', dark_webmanifest);
}

generate();