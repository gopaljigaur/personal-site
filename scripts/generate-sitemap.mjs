import { writeFileSync } from 'fs';
import { globby } from 'globby';
import prettier from 'prettier';
import { allMetadata } from '../.contentlayer/generated/allMetadata.mjs';
import { allProjects } from '../.contentlayer/generated/allProjects.mjs';
import { allBlogs } from '../.contentlayer/generated/allBlogs.mjs';

const site_url = allMetadata[0].site_url;
const meta_title = allMetadata[0].meta_title;
const meta_description = allMetadata[0].meta_description;

async function generate() {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc.js');
  const pages = await globby([
    'pages/*.tsx',
    'data/blog/*.mdx',
    'data/project/*.mdx',
    '!data/*.mdx',
    '!pages/_*.tsx',
    '!pages/api',
    '!pages/404.tsx'
  ]);
  const images = await globby([
    'public/static/images/*.png',
    'public/static/images/*.jpg',
    'public/static/logos/*.png',
    'public/static/logos/*.jpg'
  ]);
  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${pages
          .map((page) => {
            const path = page.replace(/((pages|data)|\.(tsx|mdx)$)/gm, '');
            const route = path === '/index' ? '' : path;

            return `
              <url>
                  <loc>${site_url}${route}</loc>
              </url>
            `;
          })
          .join('')}
    </urlset>
    `;
  const image_pages = await globby([
    'pages/*.tsx',
    '!pages/_*.tsx',
    '!pages/api',
    '!pages/404.tsx'
  ]);
  const image_sitemap = `
      <?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
        ${image_pages
          .map((page) => {
            const path = page.replace(/\.(tsx|mdx)$/gm, '');
            const route = path === '/index' ? '' : path;
            return `
              <url>
                <loc>${site_url}${route}</loc>
                <image:image>
                  <image:loc>${site_url}/static/images/banner.png</image:loc>
                  <image:title>${meta_title}</image:title>
                  <image:caption>${meta_description}</image:caption>
                </image:image>
              </url>
            `;
          })    
        }
        ${allBlogs
          .map((post) => {
            const image = post.image;
            return `
              <url>
                  <loc>${site_url}/blog/${post.slug}</loc>
                  <image:image>
                    <image:loc>${site_url}${image}</image:loc>
                    <image:title>${post.title}</image:title>
                    <image:caption>${post.summary}</image:caption>
                  </image:image>
              </url>
            `;
          })
          .join('')
        }
        ${allProjects
          .map((post) => {
            const image = post.image ? post.image : '/static/images/banner.jpg';
            return `
              <url>
                  <loc>${site_url}/project/${post.slug}</loc>
                  <image:image>
                    <image:loc>${site_url}${image}</image:loc>
                    <image:title>${post.title}</image:title>
                    <image:caption>${post.summary}</image:caption>
                  </image:image>
                  <image:image>
                    <image:loc>${site_url}/static/logos/${post.logo}</image:loc>
                    <image:title>${post.logo.replace(/\.(png|jpg)$/gm, '')}</image:title>
                  </image:image>
              </url>
            `;
          })
        .join('')
      }
      </urlset>
    `;

  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html'
  });

  const formatted_image = prettier.format(image_sitemap, {
    ...prettierConfig,
    parser: 'html'
    }

  )
  // eslint-disable-next-line no-sync
  writeFileSync('public/sitemap.xml', formatted);
  writeFileSync('public/sitemap-images.xml', formatted_image);
}

generate();
