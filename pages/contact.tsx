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
            You can send me a message directly through this website or connect with me on social platforms.
            You can also email me here: <Link href={`mailto:${socialMdx.email}`}>
            <a className="text-gray-800 dark:text-gray-300 hover:text-black hover:dark:text-gray-200 underline transform-colors">
              {socialMdx.email}
            </a>
          </Link>
          </p>
        </div>
        <ContactForm />
      </div>
    </Container>
  );
}
