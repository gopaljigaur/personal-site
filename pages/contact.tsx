import Link from 'next/link';
import Container from 'components/Container';
import ReactTooltip from 'react-tooltip';
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
            <a className="text-gray-800 dark:text-gray-300 hover:text-black hover:dark:text-gray-200 underline transform-colors">
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
              <a href={socialMdx.twitter} target="_blank" rel="noopener noreferrer" data-tip={`@${socialMdx.twitter.split(/\//g).slice(-1)}`}>{ TwitterIcon }</a>
              <a href={socialMdx.github} target="_blank" rel="noopener noreferrer" data-tip={`@${socialMdx.github.split(/\//g).slice(-1)}`}>{ GithubIcon }</a>
              <a href={socialMdx.linkedin} target="_blank" rel="noopener noreferrer" data-tip={`@${socialMdx.linkedin.split(/\//g).slice(-1)}`}>{ LinkedinIcon }</a>
              <a href={'mailto:' + socialMdx.email} target="_blank" rel="noopener noreferrer" data-tip={socialMdx.email}>{ EmailIcon }</a>
      </div>
        <ReactTooltip className="tooltipClass" place="bottom" effect="solid" border={true} delayHide={150}/>
      </div>
    </Container>
  );
}
