import Link from 'next/link';
import { NextSeo, SocialProfileJsonLd } from 'next-seo';
import Container from 'components/Container';
import { ArrowIcon } from '../components/SvgIcons';
import { allAbouts } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer/hooks';
import components from 'components/MDXComponents';
import metadata from '../data/metadata.json';

export default function About() {
  const about = allAbouts[0];
  const Bio = useMDXComponent(about.bio.code);
  const Education = useMDXComponent(about.education.code);
  const Work = useMDXComponent(about.work.code);
  return (
    <>
    <NextSeo
      openGraph={{
        title: metadata.name,
        description: metadata.short_bio,
        url: metadata.site_url,
        type: 'profile',
        profile: {
          firstName: metadata.name.split(' ')[0],
          lastName: metadata.name.split(' ')[0],
          username: metadata.meta_twitter,
          gender: 'male',
        },
        images: [
          {
            url: metadata.avatar,
            alt: 'Profile Photo',
          },
        ],
      }}
    />
      <SocialProfileJsonLd
        type="Person"
        name={metadata.name}
        url={metadata.site_url}
        sameAs={[
          metadata.github,
          metadata.linkedin,
          metadata.twitter
        ]}
      />
    <Container
      title="About"
    >
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16 w-full">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-1 text-black dark:text-white">
          About Me
        </h1>
        <div className="mb-8 prose dark:prose-dark leading-6">
          <p></p>
          <h3>Bio</h3>
          <Bio components={{...components} as any} />
          <h3>Education</h3>
          <Education components={{...components} as any} />
          <h3>Work</h3>
          <Work components={{...components} as any} />
        </div>
        <Link href="/timeline">
          <a className="flex mt-4 text-gray-600 dark:text-gray-400 leading-7 rounded-lg hover:text-black dark:hover:text-gray-200 transition-all h-6">
            View my timeline
            { ArrowIcon }
          </a>
        </Link>
      </div>
    </Container>
    </>
  );
}
