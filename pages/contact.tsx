import Link from 'next/link';
import Container from 'components/Container';
import ContactForm from '../components/ContactForm';
import { EmailIcon, GithubIcon, LinkedinIcon, TwitterIcon } from '../components/SvgIcons';
import socialMdx from '../.contentlayer/generated/Metadata/metadata__social.mdx.json';

export default function Contact() {
  return (
    <Container title="Contact"
               description="My contact information and collection of social links.">
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          Contact
        </h1>
        <div className="mb-4">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            You can send me a message directly or connect with me on <Link href="#links">
            <a className="text-gray-900 dark:text-gray-100 underline">
              social platforms.
            </a>
          </Link>
          </p>
        </div>
        <ContactForm />
        <h3 id="links" className="mt-8 mb-6 text-2xl font-bold tracking-tight text-black md:text-4xl dark:text-white">
          Links
        </h3>
        <div className="text-gray-600 dark:text-gray-400 mt-8 mb-4 flex flex-row flex-wrap w-full gap-x-6 mb-8 justify-center md:gap-16 lg:gap-20">
              <a href={socialMdx.twitter} target="_blank" rel="noopener noreferrer" title="Twitter">{ TwitterIcon }</a>
              <a href={socialMdx.github} target="_blank" rel="noopener noreferrer" title="Github">{ GithubIcon }</a>
              <a href={socialMdx.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn">{ LinkedinIcon }</a>
              <a href={'mailto:' + socialMdx.email} target="_blank" rel="noopener noreferrer" title="Email">{ EmailIcon }</a>
      </div>
      </div>
    </Container>
  );
}
