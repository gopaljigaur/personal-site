import {
  ComputedFields,
  defineDocumentType,
  makeSource
} from 'contentlayer/source-files';

import readingTime from 'reading-time';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrism from 'rehype-prism-plus';

const computedFields: ComputedFields = {
  readingTime: { type: 'json', resolve: (doc) => readingTime(doc.body.raw) },
  wordCount: {
    type: 'number',
    resolve: (doc) => doc.body.raw.split(/\s+/gu).length
  },
  slug: {
    type: 'string',
    resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, '').replace('/\s/', '-')
  }
}

const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: 'blog/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    publishedAt: { type: 'string', required: true },
    summary: { type: 'string', required: true },
    image: { type: 'string', required: true }
  },
  computedFields
}));

const Project = defineDocumentType(() => ({
  name: 'Project',
  filePathPattern: 'project/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    summary: { type: 'string', required: true },
    url: { type: 'string', required: true },
    source_url: { type: 'string', required: false },
    logo: { type: 'string', required: true }
  },
  computedFields
}));

const Newsletter = defineDocumentType(() => ({
  name: 'Newsletter',
  filePathPattern: 'newsletter/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    publishedAt: { type: 'string', required: true },
    summary: { type: 'string', required: true },
    image: { type: 'string', required: true }
  },
  computedFields
}));

const Snippet = defineDocumentType(() => ({
  name: 'Snippet',
  filePathPattern: 'snippets/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    logo: { type: 'string', required: true }
  },
  computedFields
}));

const About = defineDocumentType(() => ({
  name: 'About',
  filePathPattern: 'about.mdx',
  contentType: 'mdx',
  fields: {
    bio: { type: 'mdx', required: true },
    education: { type: 'mdx', required: true },
    work: { type: 'mdx', required: true }
  },
}));

const Timeline = defineDocumentType(() => ({
  name: 'Years',
  filePathPattern: 'timeline/*.mdx',
  contentType: 'mdx',
  fields: {
    year: { type: 'string', required: true }
  },
}));

const Metadata = defineDocumentType(() => ({
  name: 'Metadata',
  filePathPattern: 'metadata/*.mdx',
  contentType: 'mdx',
  fields: {
    name: { type: 'string', required: false},
    role: { type: 'string', required: false},
    organization: { type: 'string', required: false},
    avatar: { type: 'string', required: false},
    short_bio: {type: 'string', required: false},
    site_url: { type: 'string', required: false},
    meta_title: { type: 'string', required: false},
    meta_description: { type: 'string', required: false},
    meta_image: { type: 'string', required: false},
    meta_twitter: { type: 'string', required: false},
    google_site_verification: { type: 'string', required: false},
    yandex_verification: { type: 'string', required: false},
    email: { type: 'string', required: false},
    twitter: { type: 'string', required: false},
    github: { type: 'string', required: false},
    linkedin: { type: 'string', required: false}
  }
}));

const contentLayerConfig = makeSource({
  contentDirPath: 'data',
  documentTypes: [Blog, Project, Newsletter, Snippet, About, Timeline, Metadata],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      rehypeCodeTitles,
      rehypePrism,
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ['anchor']
          }
        }
      ]
    ]
  }
});

export default contentLayerConfig;