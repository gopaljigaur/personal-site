import Link from 'next/link';
import Container from 'components/Container';
import ContactForm from '../components/ContactForm';
import metadata from '../data/metadata.json';
import { SocialProfileJsonLd } from 'next-seo';

export default function Contact() {
  return (
    <>
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
    <Container title="Contact"
               description="My contact information and collection of social links.">
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          Contact
        </h1>
        <div className="mb-4">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            You can send me a message directly through this website or connect with me on social platforms.
            You can also email me here: <Link href={`mailto:${metadata.email}`}>
            <a className="text-gray-800 dark:text-gray-300 hover:text-black hover:dark:text-gray-200 underline transform-colors">
              {metadata.email}
            </a>
          </Link>
          </p>
        </div>
        <ContactForm />
      </div>
    </Container>
    </>
  );
}
